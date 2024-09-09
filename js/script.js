document.addEventListener('DOMContentLoaded', function() {
    var compa=[]
    const { jsPDF } = window.jspdf;
    document.getElementById('agregarBtn').addEventListener('click',function(){
        const Compañero = document.getElementById('inputCompa').value
        compa.push(Compañero)
        document.getElementById('inputCompa').value=''
        
    });

    document.getElementById('generarBtn').addEventListener('click', function() {
        
        const container = document.getElementById('dynamicInputsContainer');

        // Limpiar el contenido del contenedor
        container.innerHTML = '';
        
        // Generar campos dinámicamente
        for (let i = 0; i < compa.length; i++) {
            const row = document.createElement('div');
            row.className = 'row g-3';

            const entradaCol = document.createElement('div');
            entradaCol.className = 'col-md-6';

            const entradaLabel = document.createElement('label');
            entradaLabel.className = 'form-label fs-2';
            entradaLabel.setAttribute('for', `inputEntrada${i}`);
            entradaLabel.innerHTML = `<b>Entrada ${compa[i]}:</b>`;

            const entradaInput = document.createElement('input');
            entradaInput.type = 'text';
            entradaInput.className = 'form-control fs-4';
            entradaInput.id = `inputEntrada${i}`;

            entradaCol.appendChild(entradaLabel);
            entradaCol.appendChild(entradaInput);

            const salidaCol = document.createElement('div');
            salidaCol.className = 'col-md-6';

            const salidaLabel = document.createElement('label');
            salidaLabel.className = 'form-label fs-2';
            salidaLabel.setAttribute('for', `inputSalida${i}`);
            salidaLabel.innerHTML = `<b>Salida ${compa[i]}:</b>`;

            const salidaInput = document.createElement('input');
            salidaInput.type = 'text';
            salidaInput.className = 'form-control fs-4';
            salidaInput.id = `inputSalida${i}`;

            salidaCol.appendChild(salidaLabel);
            salidaCol.appendChild(salidaInput);

            row.appendChild(entradaCol);
            row.appendChild(salidaCol);

            container.appendChild(row);
        }
    });

    document.getElementById('PDF').addEventListener('click', function(){
        const doc = new jsPDF();
        const fecha = document.getElementById('inputdate').value
        const Proyecto = document.getElementById('inputproyecto').value
        const Encargado = document.getElementById('inputFred').value
        const Entrada = document.getElementById('inputEntrada').value
        const Salida = document.getElementById('inputSalida').value
        let x=35
        let y=100
        let xe=35
        let ye=110
        let xs = 80
        let ys= 110
        
        // Agregar contenido al PDF
        doc.text('Reporte de Horas', 80, 10);
        doc.text(`Fecha:`, 35, 20);
        doc.text(`${fecha}`,35,30)
        doc.text(`Proyecto:`,110,20)
        doc.text(`${Proyecto}`,110,30)
        doc.text(`----------------------------------------------------------------------------------------------------------------------------------------------------`,0,40)
        doc.text(`Encargado:`,35,45)
        doc.text(`${Encargado}`,65,45)
        doc.text(`Entrada:`,35,55)
        doc.text(`${Entrada}`,35,65)
        doc.text(`Salida:`,80,55)
        doc.text(`${Salida}`,80,65)
        
        for (let i = 0; i < compa.length; i++) {
            const Entrada = document.getElementById(`inputEntrada${i}`).value
            const Salida = document.getElementById(`inputSalida${i}`).value
            doc.text(`----------------------------------------------------------------------------------------------------------------------------------------------------`,0,y-5)
            doc.text(`Trabajador: ${compa[i]}`,x,y);
            doc.text('Entrada:',xe,ye)
            doc.text(Entrada,xe,ye+10)
            doc.text('Salida:',xs,ys)
            doc.text(Salida,xs,ys+10)
            y=y+30
            ys=ys+30
            ye=ye+30
        }
        // Guardar el archivo PDF
        doc.save('ejemplo.pdf');
    })
});
