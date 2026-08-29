# Lamplight source provenance

This record makes the inherited content and transformation boundary explicit. SHA-256 values identify the exact inputs used during the 1.2.0 revision; they are not statements about authorship or permission.

## Scripture corpus

- Display name: **World English Bible (WEB), Classic, Protestant 66-book canon**
- Rights statement: the publisher declares the WEB text public domain. “World English Bible” remains a trademark used to identify faithful copies.
- Publisher references: <https://worldenglish.bible/> and <https://ebible.org/eng-web/copr.htm>
- Editable source: canonical compact UTF-8 JSON in `src/data/web-classic.json`
- Generated form: a static `BIBLE_DATA` object embedded in `www/index.html`; no runtime decompression API is required
- Structure: 66 books, 1,189 chapters, 31,095 verse records
- Source file including its final newline: 4,104,101 bytes; SHA-256 `0b4aa7ef936290835fb6e2c55335436b29769c336edd32cfcf53283c4fb2f856`
- Canonical JSON/generated object: 4,104,100 bytes; SHA-256 `b240c13af435361093abe79432a36ed436fe52ed34c6dfb2be6ddebfe6946244`
- Historical v1.1 gzip payload: 1,201,532 bytes; SHA-256 `8655b2df0003c265c16106dec6cc47d70761ffc79715ae8ef1a210f0f697fce6`

The structured source was deterministically extracted from the reviewed v1.1 payload without changing its canonical JSON bytes. The earlier artifact did not retain the exact upstream download filename, download date, or conversion command. These hashes therefore lock the corpus actually reviewed, but they do not establish byte-for-byte identity with a named eBible.org archive. Before replacing the corpus, obtain a fresh official WEB Classic source, preserve that archive's original checksum and date here, and rerun all corpus/reference/build tests. Do not silently modify verse wording while continuing to label it WEB.

### Official comparison candidate (not proof of historical origin)

On 2026-08-14, the official eBible details page identified WEB Classic as the
“2020 stable text edition,” with source files dated 2026-08-08. The official
verse-addressed comparison candidate is:

- Details: <https://ebible.org/details.php?id=eng-web>
- USFM archive: <https://ebible.org/Scriptures/eng-web_usfm.zip>
- Observed `Last-Modified`: `Sat, 08 Aug 2026 06:42:12 GMT`
- Locally observed archive SHA-256: `d0dab133845cfbf2167485ed9acef77fab74c65e639027b8e69aa317585afb0c`

That digest was calculated during review; it was not published by eBible. The
unversioned ZIP contained `keys.asc` but no signed `signature.txt` manifest, so
the observation is not a publisher-authenticated checksum. Counts alone cannot
prove that the inherited JSON came from this artifact. Close the release gate
only after pinning the archive, documenting a deterministic 66-book
USFM-to-JSON normalization, comparing every verse, and human-reviewing every
difference. An exact comparison would establish present textual equivalence,
not undocumented historical derivation.

## Founding study material

The Canon Starter Pack was transcribed from the user-provided `Scripture_Flashcard_Study.pdf` and is tested as eleven ordered passage units. The original reference PDF is not included in the distributable repository because it is a 16 MB scanned working document; its identity is preserved here.

| Input | Bytes | SHA-256 |
|---|---:|---|
| `Scripture_Flashcard_Study.pdf` | 16,328,967 | `abe4ae53900c229c4f171d56f3f9a331f13d8799d61f629a8cd74c00186cf1b1` |

## Inherited Lamplight artifacts

| Input | Bytes | SHA-256 |
|---|---:|---|
| `lamplight-4.html` | 1,946,990 | `0ffb4da78647e83b70bc4f62ce2a686f17070383d916fae528f02d406bd18ddc` |
| `lamplight-store-kit.zip` | 1,991,680 | `140eae7082b820b717c9f6322c77076816628a47abf00987501f892ab2b55bb2` |
| `lamplight-chronicle.pdf` | 533,104 | `03f065475d5c46214e5fa1c8b27bb7f0071495d07d9f15d5e62d987bf33aa1e4` |

The 1.2.0 repository is a reviewed successor to those artifacts, not a byte-for-byte repackaging.

## Beatitudes music working files

The following user-provided creative working files informed the project review but are **not runtime assets and are not included in the release repository**. Publication should wait for a documented chain of permission covering composition, lyrics, performance, recording, editing, distribution, and store use, followed by a mastered accessibility-reviewed export.

| Input | Bytes | SHA-256 |
|---|---:|---|
| `Sigrid_Acapella_1.m4a` | 271,801 | `962e909c7f00099a1092fa6176cae070062e7a2ac4676a215b1c941e245385d9` |
| `Sigrid_Acapella_4.m4a` | 239,399 | `160d5b2bff417a02aafb2649e3f55ae85679dc4bc7157dfc89fdea2b019ab81e` |
| `Sigrid_Acapella_3.m4a` | 226,289 | `ebc53ea42b221880d24208dae42970c6a2085ba9eaef2007fa14f4882aeecb7b` |
| `Sigrid_Acapella_5.m4a` | 231,127 | `85c1c75310fec5ebcc5b0db5fee9a107e4982f00e480c8d86cd18cc8ee2a9389` |
| `Sigrid_Acapella_2.m4a` | 245,599 | `45935e5563d754217b3e9869f53d828304630b48c66d475e735d0841087e66c7` |
| `Beatitudes_Lyrics.rtf` | 2,235 | `8de3dea97ae375cf1e23a08a3dc5a0609b00251fe08424506165c5ceb6ffbb58` |
| `Beatitudes_Generator.py` | 4,380 | `ed8bd165ea9a9227b2f1526697bd375111c96fdd1866f85ff5f7378846f65cf5` |
| `Beatitudes.band.zip` | 313,289 | `7841bbd57329f6f9dc6801935931865d8c00eb892da89a39fad06fd2968fa23b` |
| source `README.md` | 4,405 | `682b3fd54dc0e435ab42a1979aa3e729f3eac670bb000ca2caa1a213c730c06d` |

## Generated integrity records

The checked-in Gradle 8.14.3 Wrapper JAR has SHA-256
`7d3a4ac4de1c32b59bc6a4eb8ecb8e612ccd0cf1ae1e99f66902da64df296172`,
matching Gradle's published wrapper checksum. Its binary distribution is
pinned to the publisher-listed SHA-256
`bd71102213493060956ec229d946beee57158dbd89d0e62b91bca0fa2c5f3531`.
These values are enforced by automated validation and must change only in a
reviewed Gradle upgrade. Publisher reference:
<https://gradle.org/release-checksums/>.

`ASSET-INVENTORY.json` identifies shipped visual/media assets and embedded payloads. `integrity/file-manifest.json` and `integrity/SHA256SUMS` cover every release-source file except the two integrity files themselves. Regenerate them only after reviewing intentional changes:

```sh
node scripts/generate-integrity.mjs --write
node scripts/qa.mjs
```

The release ZIP writer fixes entry order, timestamps, permissions, and compression method, so the same source tree produces the same archive bytes.
