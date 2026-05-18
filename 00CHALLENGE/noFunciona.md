# No Funciona — Media Recorder Project

## Project: `miMediaRecorder2`

### Files
- `index.html` — HTML with buttons, video preview, download link
- `script/script.js` — MediaRecorder logic

### Expected behavior
1. Allow camera/mic permission
2. Show live preview in `<video>`
3. Click **GRABAR** → starts recording
4. Click **PARAR** → stops, shows download link
5. Click **Descargar Video** → downloads `.webm` file

### Actual behavior
Not working. Error in console (see attached screenshot).

### Possible causes to check

| # | Issue | Check |
|---|-------|-------|
| 1 | Opened via `file://` protocol | `getUserMedia` requires `https://` or `http://localhost`. Use Live Server or `python -m http.server 8080` |
| 2 | Permission denied | Did the browser prompt for camera/mic access? Check browser settings |
| 3 | `let mediaRecorder` declared inside `.then()` | Works, but `mediaRecorder` is not accessible from global scope (e.g., console debugging) |
| 4 | MIME type not supported | `video/webm` may not be supported in all browsers. Try `video/mp4` as fallback |
| 5 | Console error | Paste the exact error message here: |

```
[Paste error message here]
```
