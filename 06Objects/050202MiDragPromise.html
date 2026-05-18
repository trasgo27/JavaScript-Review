<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .btn-control{
            margin: 5px;
            padding: 8px 16px;
            cursor: pointer;
            border: 1px solid #333;
            border-radius: 4px;
            font-size: 14px;
        }
        #divControles{
            margin-top: 5px;
            width: 600px;
            padding: 10px;
            border: 2px solid black;
            text-align: center;
            background-color: beige;
        }
    </style>
</head>
<body>
    <div id="miContenedor"  style="background-color: aliceblue; width: 600px; overflow:hidden; height: 400px; border: 2px solid black; position: relative; ">
        <div id="divAmarillo" style="background-color: yellow;border: black solid 2px; position: absolute;left: 50px;top: 50%;width:100px;height: 100px;display: flex; ">
            <p style="">Arrastrame</p>
        </div>
        <div id="divBlanco" style="background-color: white;border: black dotted 5px; position: absolute;right: 50px;top: 50%;width:100px;height: 100px;display: flex; ">
            <p style="">Destino</p>
        </div>
        <div>
        </div>
    </div>    
    <p id="miResultado">Status:</p>
    <!-- 3 Buttons for Data Persistence -->
    <div id="divControles">
        <button class="btn-control" id="btnReset" onclick="resetPositions()">🔄 Reset Positions</button>
        <button class="btn-control" id="btnSave" onclick="saveToLocalStorage()">💾 Save to Local Storage</button>
        <button class="btn-control" id="btnClear" onclick="clearLocalStorage()">🗑️ Clear Storage</button>
    </div>
</body>
<script>
    //variables
    let isDragging=false;
    let isOverlapping = false;
    const cajaAmarilla = document.querySelector('#divAmarillo');
    const cajaBlanca = document.querySelector('#divBlanco');
    const miContenedor = document.getElementById('miContenedor');
    const miResultado = document.getElementById('miResultado');

    // 💾 Save the ORIGINAL inline positions before anything changes
    const inicioAmarilla = {
        left: cajaAmarilla.style.left,   // "50px"
        top:  cajaAmarilla.style.top     // "50%"
    };

    //event listener
    cajaAmarilla.addEventListener('mouseover',function(){
        cajaAmarilla.innerHTML="Cogeme!!!";
        cajaAmarilla.style.backgroundColor="orange";
        cajaAmarilla.style.cursor="grab";
    });
    cajaAmarilla.addEventListener('mousedown',function(){
        isDragging=true;
        cajaAmarilla.style.backgroundColor="lightblue";
        cajaAmarilla.innerHTML="COGIDO!!!";
        cajaAmarilla.style.cursor="grabbing";
        cajaAmarilla.style.zIndex = "1000";
    });

    //miPromesa Verifica Choque
    //Returns a Promise that resolves or rejects based on overlap
    const verificarChoque = function () {
        // We return the Promise itself
        return new Promise((resolve, reject) => {
            //getBoundingClientRect() returns an object with the location and size
            const posiAma = cajaAmarilla.getBoundingClientRect();
            const posiBlan = cajaBlanca.getBoundingClientRect();
            //Overlapping check: hayHueco = true means NO overlap
            let hayHueco = (
                posiAma.right  < posiBlan.left  ||
                posiAma.left   > posiBlan.right ||
                posiAma.bottom < posiBlan.top   ||
                posiAma.top    > posiBlan.bottom
            );
            if(!hayHueco){
                resolve("CONSEGUIDO!!!");
            }else{
                reject("Has Fallado!!!");
            }
        });
    }

    //Mouse move logic with CLAMPING
    document.addEventListener('mousemove',function(evento){
        if(!isDragging) return;

        const contRect  = miContenedor.getBoundingClientRect();
        const cajaAncho = cajaAmarilla.offsetWidth;   // 100px
        const cajaAlto  = cajaAmarilla.offsetHeight;  // 100px

        // Position RELATIVE to the container, centered on cursor
        let RelativaX = (evento.clientX - contRect.left) - cajaAncho / 2;
        let RelativaY = (evento.clientY - contRect.top)  - cajaAlto / 2;

        // CLAMP: keep the box inside the container
        RelativaX = Math.max(0, Math.min(RelativaX, contRect.width  - cajaAncho));
        RelativaY = Math.max(0, Math.min(RelativaY, contRect.height - cajaAlto));

        cajaAmarilla.style.left = RelativaX + "px";
        cajaAmarilla.style.top  = RelativaY + "px";
    });

    //Drop Logic Attach to the Document
    document.addEventListener('mouseup', function () {
        //safety check 
        //If we were not dragging don't do anything
        if (!isDragging) return;
        isDragging = false;

        // Use the Promise properly with .then() and .catch()
        verificarChoque()
            .then((msg) => {
                cajaBlanca.style.backgroundColor = "lightgreen";
                cajaBlanca.innerHTML = "LOGRADO!!!";
                //cambiar aspecto cajaAmarilla
                cajaAmarilla.style.backgroundColor = "green";
                cajaAmarilla.style.color = "yellow";
                cajaAmarilla.innerHTML = "Muy Bien!!!";
                miResultado.textContent = "Status: ✅ " + msg;
            })
            .catch((msg) => {
                cajaBlanca.style.backgroundColor = "white";
                cajaBlanca.innerHTML = "NOOOO!!!";
                // Visual reset for the yellow box
                cajaAmarilla.style.backgroundColor = "yellow";
                cajaAmarilla.innerHTML = "SOLTADO!!!";
                cajaAmarilla.style.cursor = "grab";
                miResultado.textContent = "Status: ❌ " + msg;
            });
    });

    // ==========================================
    // 💾 DATA PERSISTENCE - LOCAL STORAGE LOGIC
    // ==========================================

    // SAVE: Collect position and save as JSON
    function saveToLocalStorage() {
        const posiciones = {
            divAmarillo: {
                left: cajaAmarilla.style.left,
                top:  cajaAmarilla.style.top
            }
        };
        localStorage.setItem("posicionesDragPromise", JSON.stringify(posiciones));
        miResultado.textContent = "Status: ✅ Position saved to Local Storage!";
        console.log("Saved:", posiciones);
    }

    // LOAD: Check on page load if there are saved positions
    function loadFromLocalStorage() {
        const saved = localStorage.getItem("posicionesDragPromise");
        if (saved) {
            const posiciones = JSON.parse(saved);
            if (posiciones.divAmarillo) {
                cajaAmarilla.style.left = posiciones.divAmarillo.left;
                cajaAmarilla.style.top  = posiciones.divAmarillo.top;
            }
            miResultado.textContent = "Status: 📂 Loaded saved position from Local Storage!";
            console.log("Loaded:", posiciones);
        }
    }

    // CLEAR: Remove saved data from Local Storage
    function clearLocalStorage() {
        localStorage.removeItem("posicionesDragPromise");
        miResultado.textContent = "Status: 🗑️ Local Storage cleared!";
        console.log("Local Storage cleared.");
    }

    // RESET: Move the yellow box back to its original position
    function resetPositions() {
        cajaAmarilla.style.left = inicioAmarilla.left;
        cajaAmarilla.style.top  = inicioAmarilla.top;
        cajaAmarilla.style.backgroundColor = "yellow";
        cajaAmarilla.innerHTML = "Arrastrame";
        cajaAmarilla.style.cursor = "grab";
        cajaAmarilla.style.zIndex = "1";
        cajaAmarilla.style.color = "black";
        cajaBlanca.style.backgroundColor = "white";
        cajaBlanca.innerHTML = "Destino";
        miResultado.textContent = "Status: 🔄 Reset to original position!";
    }

    // 💾 Load saved positions when page starts
    loadFromLocalStorage();

</script>
</html>