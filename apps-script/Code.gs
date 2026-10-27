const SHEET_NAME = 'IMOVEL';
const FORM_KEY = 'imovel_site_v1';

const HEADERS = [
  'Recebido em',
  'ID do lead',
  'Nome',
  'WhatsApp',
  'Situação',
  'Consentimento',
  'Origem',
  'Página',
  'Local do formulário',
  'Enviado pelo navegador em',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Content',
  'UTM Term',
  'GCLID',
  'GBRAID',
  'WBRAID',
];

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'leads_penhora_imoveis',
    sheet: SHEET_NAME,
  });
}

function doPost(e) {
  let lock;

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Corpo da requisição ausente.');
    }

    const data = JSON.parse(e.postData.contents);
    validateLead_(data);

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error('Vincule este Apps Script à planilha que receberá os leads.');
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0B0B0B')
        .setFontColor('#FFFFFF');
    }

    const attribution = data.attribution || {};
    const rowByHeader = {
      'Recebido em': new Date(),
      'ID do lead': safeCell_(data.leadId),
      'Nome': safeCell_(data.name),
      'WhatsApp': safeCell_(data.whatsapp),
      'Situação': safeCell_(data.situation),
      'Consentimento': data.privacyAccepted === true ? 'Sim' : 'Não',
      'Origem': safeCell_(data.pageService),
      'Página': safeCell_(data.pageUrl),
      'Local do formulário': safeCell_(data.formLocation),
      'Enviado pelo navegador em': safeCell_(data.submittedAt),
      'UTM Source': safeCell_(attribution.utm_source),
      'UTM Medium': safeCell_(attribution.utm_medium),
      'UTM Campaign': safeCell_(attribution.utm_campaign),
      'UTM Content': safeCell_(attribution.utm_content),
      'UTM Term': safeCell_(attribution.utm_term),
      'GCLID': safeCell_(attribution.gclid),
      'GBRAID': safeCell_(attribution.gbraid),
      'WBRAID': safeCell_(attribution.wbraid),
    };
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    sheet.appendRow(currentHeaders.map(function (header) {
      return Object.prototype.hasOwnProperty.call(rowByHeader, header) ? rowByHeader[header] : '';
    }));

    SpreadsheetApp.flush();
    return jsonResponse_({ ok: true, leadId: data.leadId });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  } finally {
    if (lock && lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function validateLead_(data) {
  if (data.formKey !== FORM_KEY) {
    throw new Error('Identificação do formulário inválida.');
  }

  const required = ['leadId', 'name', 'whatsapp', 'situation'];
  required.forEach(function (field) {
    if (!String(data[field] || '').trim()) {
      throw new Error('Campo obrigatório ausente: ' + field);
    }
  });

  const phoneDigits = String(data.whatsapp).replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    throw new Error('WhatsApp inválido.');
  }

  const situations = ['Imóvel penhorado', 'Risco de penhora', 'Leilão agendado', 'Outra situação'];

  if (situations.indexOf(data.situation) === -1) {
    throw new Error('Situação inválida.');
  }
  if (data.privacyAccepted !== true) {
    throw new Error('Consentimento de privacidade ausente.');
  }
}

function safeCell_(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 1000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
