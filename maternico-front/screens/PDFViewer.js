import WebView from "react-native-webview";

export default function PDFViewer() {
    return (
        <WebView
        source={{uri: 'github.com'}} // no tengo el link del pdf aqui
        />
    )
}