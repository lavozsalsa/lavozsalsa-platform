#!/usr/bin/env python3

import json
import pathlib
import sys
import urllib.parse
import urllib.request


ROOT = pathlib.Path(__file__).resolve().parents[1]
TRACKS_PATH = ROOT / "content" / "descargar-salsa-audios.json"
AUDIO_DIR = ROOT / "assets" / "audio" / "descargas"
USER_AGENT = "Mozilla/5.0 (compatible; PulsoSalseroMigrator/1.0)"


def encoded_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit(
        (
            parsed.scheme,
            parsed.netloc,
            urllib.parse.quote(parsed.path),
            parsed.query,
            parsed.fragment,
        )
    )


def main() -> int:
    if not TRACKS_PATH.exists():
        print(f"No existe el catálogo: {TRACKS_PATH}", file=sys.stderr)
        return 1

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    tracks = json.loads(TRACKS_PATH.read_text(encoding="utf-8"))
    total_bytes = 0
    failures = []

    for track in tracks:
        target = AUDIO_DIR / track["filename"]
        source_url = encoded_url(track["sourceUrl"])

        if not target.exists():
            print(f"Descargando {track['index']:02d}/78: {track['filename']}", flush=True)
            request = urllib.request.Request(source_url, headers={"User-Agent": USER_AGENT})

            try:
                with urllib.request.urlopen(request, timeout=45) as response, target.open("wb") as output:
                    while True:
                        chunk = response.read(1024 * 256)
                        if not chunk:
                            break
                        output.write(chunk)
            except Exception as error:
                if target.exists():
                    target.unlink()
                failures.append({"track": track["filename"], "error": str(error)})
                print(f"Fallo en {track['filename']}: {error}", file=sys.stderr, flush=True)
                continue

        size_bytes = target.stat().st_size
        total_bytes += size_bytes
        track["sizeBytes"] = size_bytes

    TRACKS_PATH.write_text(json.dumps(tracks, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Listo. {len(tracks)} audios espejados.")
    print(f"Peso total: {total_bytes / (1024 * 1024):.2f} MB")
    if failures:
        print(f"Fallos: {len(failures)}", file=sys.stderr)
        for item in failures:
            print(f"- {item['track']}: {item['error']}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
