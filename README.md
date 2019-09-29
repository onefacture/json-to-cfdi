# JSON to CFDI

Este módulo genera un CFDI a partir de una estructura JSON pero no valida si la estructura es correcta o si introdujiste correctamente los códigos de algún catálogo del SAT. Se recomienda hacer muchas pruebas antes de utilizar en producción.

Soporta los siguientes complementos.

- Pagos
- Nominas 1.2
- ComercioExterior 1.1 y 1.1


### Instalación

```
npm i --save json-to-cfdi
```

### Uso

```Javascript
const JsonToCfdi = require('json-to-cfdi');
var result = null;

result = JsonToCfdi.parse({
	jsonXML: { }
});

/**
*   El valor de la variable result debería ser el siguiente (En una línea).
*
*   <?xml version="1.0" encoding="utf-8"?>
*    <cfdi:Comprobante
*        xsi:schemaLocation="... cfdv33.xsd"
*        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
*        xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
*        Version="3.3"
*    ></cfdi:Comprobante>
*
*/

result = JsonToCfdi.parse({
	jsonXML: {
		serie: 'A01',
		folio: '001',
		emisor: {
			regimenFiscal: '612',
			rfc: 'OIRR940203TH7'
		},
		receptor: {
			rfc: 'XAXX010101000',
			usoCFDI: 'P01'
		},
	}
});

/**
*   El valor de la variable result debería ser el siguiente (En una línea).
*
*   <?xml version="1.0" encoding="utf-8"?>
*    <cfdi:Comprobante
*        xsi:schemaLocation="... cfdv33.xsd"
*        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
*        xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
*        Version="3.3"
*        Serie="A01"
*        Folio="001"
*    >
*         <cfdi:Emisor
*             Rfc="OIRR940203TH7"
*             RegimenFiscal="612"
*         ></cfdi:Emisor>
*         <cfdi:Receptor
*             Rfc="XAXX010101000"
*             UsoCFDI="P01"
*         ></cfdi:Receptor>
*    </cfdi:Comprobante>
*
*/

```

### Estructura de datos
El JSON puede contener los siguiente datos. Los cuales ayudarán a obtener el CFDI.
```
{
    version: String,
    serie: String,
    sello: String,
    folio: String,
    fecha: String,
    formaDePago: String,
    metodoDePago: String,
    subTotal: String,
    total: String,
    certificado: String,
    noCertificado: String,
    tipoDeComprobante: String,
    moneda: String,
    tipoCambio: String,
    descuento: String,
    motivoDescuento: String,
    lugarExpedicion: String,
    numCtaPago: String,
    emisor: Object<{
        nombre: String,
        rfc: String,
        regimenFiscal: String
    }>,
    receptor: Object<{
        nombre: String,
        rfc: String,
        residenciaFiscal: String,
        numRegIdTrib: String,
        usoCFDI: String
    }>,
    conceptos: Array<{
        claveProdServ: String,
        noIdentificacion: String,
        cantidad: String,
        claveUnidad: String,
        unidad: String,
        descripcion: String,
        valorUnitario: String,
        importe: String,
        descuento: String
    }>
    impuestos: Object<{
        totalImpuestosRetenidos: String,
        totalImpuestosTrasladados: String,
        traslados: Array<{ ... }>,
        retenciones: Array<{ ... }>
    }>
    ...
}
```

### Licencia

MIT

