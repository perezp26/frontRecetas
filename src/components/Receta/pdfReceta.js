import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable' 
import logoImss from '../../imgs/logo_imssBienestar.png'
import logo_hraepy from '../../imgs/hraepyLogo.png'


export const pdfReceta = ( data ) => {
    const { idTipoReceta, folio, fechaReceta, nombreMedico, cedulaProfesional, universidad, nombrePaciente, fechaNacimiento, curp, expediente, diagnostico, recetaDetalles } = data;
    const doc = new jsPDF({orientation: 'portrait', unit: 'mm', format:'letter'});
    const header = [ { header: 'No.', dataKey:'noEnvases' }, { header: '', dataKey:'tipoDispensacion' }, { header: 'Nombre genérico del medicamento y presentación' , dataKey:'producto', width:70}, 
        {header : 'Dosis', dataKey:'dosis'}, { header:'Via admin', dataKey : 'viaAdmin'}, { header:'Duración', dataKey:'duracion'} ]

    const rowsTableDetalle = recetaDetalles.map( x => ( {
            noEnvases : x.noEnvases.toString(),
            tipoDispensacion : x.tiposDispensacion.descripcion,
            producto : x.producto.label,
            dosis : x.dosis,
            viaAdmin : x.viaAdmin,
            duracion : x.duracion
        
    }) );
    let heightTable = 0
    autoTable( doc, {
        margin: { top:67,left:10, bottom:45 },
        theme:'grid',
        headStyles : { fontSize:7, fillColor:"#fff", textColor:"#000", valign:'middle', lineWidth:.1, lineColor:"#cccccc"  },
        bodyStyles: { fontSize: 7  },
        columnStyles: {  
            0: { halign: 'center', valign:'middle', cellPadding:1.5, cellWidth:8, },
            1: { halign: 'center', valign:'middle', cellPadding:1.5, cellWidth:15, },
            2: { halign: 'left',   valign:'middle', cellPadding:1.5, cellWidth:104, },
            3: { halign: 'center', valign:'middle', cellPadding:1.5, cellWidth:25 },
            4: { halign: 'center', valign:'middle', cellPadding:1.5, cellWidth:20 },
            5: { halign: 'center', valign:'middle', cellPadding:1.5, cellWidth:20 },
        },
        body: rowsTableDetalle,
        columns:header, 
        didDrawPage: function (data) {
            heightTable =  data.cursor.y ;
        }
    } )

                headerReceta( doc, { folio, fechaReceta, nombreMedico, cedulaProfesional, universidad, nombrePaciente, fechaNacimiento, curp, expediente, diagnostico }  );

     if (heightTable > 176){
                footerReceta( doc, { idTipoReceta, nombreMedico, cedulaProfesional, universidad } )
        }
        else
        {
            const widthNombre = (52 - doc.getTextWidth( nombreMedico ) ) / 2
            const widthCedula = (52 - doc.getTextWidth("Ced. " + cedulaProfesional ) ) / 2
            const widthUniversidad = (52 - doc.getTextWidth( universidad ) ) / 2

            const positionY = heightTable + 20

            doc.setDrawColor(0, 0, 0);
            doc.line(150, positionY, 202, positionY);
            doc.text(nombreMedico ,150 + widthNombre , positionY + 3)
            doc.text("Ced. "+ cedulaProfesional,150 + widthCedula, positionY + 6)
            doc.text( universidad,150 + widthUniversidad, positionY + 9 )

            if ( Number(idTipoReceta) === 3 ){
                doc.line(10, positionY, 62, positionY);
                doc.text("Nombre y Firma",25,positionY + 3 )
                doc.text("Autorizó",30, positionY + 6 )
            }
        }
                        
    doc.autoPrint();
    window.open(doc.output('bloburl'));

}


const headerReceta = (doc, { folio, fechaReceta, nombreMedico, cedulaProfesional, universidad, nombrePaciente, fechaNacimiento, curp, expediente, diagnostico } ) => {
    const pageCount = doc.internal.getNumberOfPages()
    for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        
        doc.addImage(logoImss, "PNG", 10, 12, 40, 15);
    
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("Receta Médica", 90, 12);
        
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE LA PENÍNSULA DE YUCATÁN",51,17);
    
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text("Calle 7 No. 433 por 20 y 22 Fracc. Altabrisa C.P. 97130",73,20);
    
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text("Mérida Yucatán tel. (999) 942 7600",86,23);
    
        doc.addImage(logo_hraepy, "PNG", 162, 12, 40, 15);
    
    
        doc.setFillColor(206,206,206);
        doc.setDrawColor(206,206,206);
        doc.rect(10,30,130,4,"FD")
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Datos del Médico",60,33);
    
        doc.setFont("helvetica", "normal");
        doc.text("Fecha: ",143,33);
        doc.text(`${ fechaReceta }`,152,33);
        doc.text("Folio: ",170,33);
        doc.text(Number(folio).toString(),178,33);
    
        doc.text("Nombre Completo: ",10,38);
        doc.text(` ${ nombreMedico }`,34,38);
        doc.text("Cédula Profesional: ",10,43);
        doc.text(` ${ cedulaProfesional }`,34,43);
        doc.text("Universidad: ",100,43);
        doc.text(` ${ universidad }`,115,43);
    
        doc.setFillColor(206,206,206);
        doc.setDrawColor(206,206,206);
        doc.rect(10,45,192,4,"FD")
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Datos del Paciente",90,48);
    
        doc.setFont("helvetica", "normal");
        doc.text("Nombre Completo: ",10,53);
        doc.text(` ${ nombrePaciente }`,34,53);
        doc.text("Fecha Nacimiento: ",140,53);
        doc.text(` ${ fechaNacimiento }`,165,53);
    
        doc.text("CURP: ",10,58);
        doc.text(` ${ curp }`,20,58);
        doc.text("Expediente: ",80,58);
        doc.text(` ${ expediente }`,95,58);
    
        doc.text("Diagnostico: ",10,63);
        const textLines = doc.splitTextToSize( diagnostico, 176 );
        doc.text( diagnostico ,27,63,  {maxWidth: 173, align: "justify"}); // to justify


      }

}

const footerReceta = ( doc, {idTipoReceta, nombreMedico, cedulaProfesional, universidad } ) => {
    const widthNombre = (52 - doc.getTextWidth( nombreMedico ) ) / 2
    const widthCedula = (52 - doc.getTextWidth("Ced. " + cedulaProfesional ) ) / 2
    const widthUniversidad = (52 - doc.getTextWidth( universidad ) ) / 2
    const pageCount = doc.internal.getNumberOfPages()
    for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(0, 0, 0);
        doc.line(150, 250, 202, 250);
        doc.text(nombreMedico ,150 + widthNombre , 253)
        doc.text("Ced. "+ cedulaProfesional,150 + widthCedula, 256)
        doc.text(universidad,150 + widthUniversidad, 259)

        if ( idTipoReceta === 3 ){
            doc.line(10, 250, 62, 250);
            doc.text("Nombre y Firma",25,253 )
            doc.text("Autorizó",30,256 )
        }
    }

}