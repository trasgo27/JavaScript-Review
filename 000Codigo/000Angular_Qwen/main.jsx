import { create Root } from 'react-dom/client';
function Hello() {
    return (
        <h1>Hola Mundo!</h1>
    );
}
createRoot(document.getElementById('root')).render(<Hello />);