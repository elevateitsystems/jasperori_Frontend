'use client';

import { useEffect, useMemo, useState } from 'react';

import type { Locale } from '@/i18n/routing';

type InvoiceStatus = 'draft' | 'sent' | 'paid';

interface InvoiceItem {
  description: string;
  quantity: string;
  unit: string;
  unitPrice: string;
}

interface Invoice {
  id: string;
  number: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  customerName: string;
  customerAddress: string;
  customerPostal: string;
  customerEmail: string;
  customerReference: string;
  sellerReference: string;
  subject: string;
  vatRate: string;
  items: InvoiceItem[];
}

const storageKey = 'techsalem.invoice-manager.v1';
const presetVatRates = ['25', '12', '6', '0'];

const text = {
  en: {
    title: 'Invoice management',
    subtitle: 'Create, edit and print customer invoices.',
    localNotice:
      'Invoices are saved in this browser only. Email and attach the downloaded PDF yourself.',
    savedInvoices: 'Saved invoices',
    noInvoices: 'No saved invoices yet.',
    newInvoice: 'New invoice',
    customer: 'Customer',
    name: 'Name / company',
    address: 'Street address',
    postal: 'Postcode and city',
    email: 'Email',
    customerReference: 'Customer reference',
    invoiceDetails: 'Invoice details',
    invoiceNumber: 'Invoice number',
    numberOnSend: 'Assigned when sent',
    issueDate: 'Invoice date',
    dueDate: 'Due date',
    terms: 'Payment terms (days)',
    sellerReference: 'Our reference',
    subject: 'Invoice subject',
    vatRate: 'VAT rate',
    presetVatRate: 'Select a rate',
    customVatRate: 'Custom rate (%)',
    customRateOption: 'Custom rate',
    items: 'Items',
    description: 'Description',
    quantity: 'Quantity',
    unit: 'Unit',
    unitPrice: 'Unit price excl. VAT',
    addItem: 'Add row',
    save: 'Save invoice',
    print: 'Print / save PDF',
    emailDraft: 'Create email draft',
    markSent: 'Mark as sent',
    markPaid: 'Mark as paid',
    draft: 'Draft',
    sent: 'Sent',
    paid: 'Paid',
    saved: 'Invoice saved in this browser.',
    needEmail: 'Add the customer email first.',
    newConfirm: 'Start a new invoice? Save the current one first if you need it.',
    printHint: 'Use “Save as PDF” in the print dialog.',
    mailHint: 'The email opens as a draft. Attach the PDF you saved before sending.',
    invoice: 'INVOICE',
    draftStamp: 'DRAFT',
    recipientRef: 'Customer reference',
    ourRef: 'Our reference',
    invoiceSubject: 'Invoice subject',
    paymentTerms: 'Payment terms',
    descriptionHead: 'Description',
    quantityHead: 'Qty',
    unitHead: 'Unit',
    priceHead: 'Price',
    totalHead: 'Total',
    subtotal: 'Total excl. VAT',
    vat: 'VAT',
    rounding: 'Rounding',
    amountDue: 'Amount due',
    sendDate: 'Assigned when sent',
    invoiceEmailSubject: 'Invoice',
    emailBody: 'Please find the invoice details below. The PDF is attached.',
  },
  sv: {
    title: 'Fakturahantering',
    subtitle: 'Skapa, redigera och skriv ut kundfakturor.',
    localNotice:
      'Fakturor sparas endast i den här webbläsaren. Bifoga den nedladdade PDF-filen själv i mejlet.',
    savedInvoices: 'Sparade fakturor',
    noInvoices: 'Inga sparade fakturor ännu.',
    newInvoice: 'Ny faktura',
    customer: 'Kund',
    name: 'Namn / företag',
    address: 'Gatuadress',
    postal: 'Postnummer och ort',
    email: 'E-post',
    customerReference: 'Er referens',
    invoiceDetails: 'Fakturauppgifter',
    invoiceNumber: 'Fakturanummer',
    numberOnSend: 'Sätts vid utskick',
    issueDate: 'Fakturadatum',
    dueDate: 'Förfallodatum',
    terms: 'Betalningsvillkor (dagar)',
    sellerReference: 'Vår referens',
    subject: 'Fakturan avser',
    vatRate: 'Momssats',
    presetVatRate: 'Välj momssats',
    customVatRate: 'Anpassad momssats (%)',
    customRateOption: 'Anpassad momssats',
    items: 'Fakturarader',
    description: 'Beskrivning',
    quantity: 'Antal',
    unit: 'Enhet',
    unitPrice: 'Pris per enhet exkl. moms',
    addItem: 'Lägg till rad',
    save: 'Spara faktura',
    print: 'Skriv ut / spara PDF',
    emailDraft: 'Skapa mejlutkast',
    markSent: 'Markera som skickad',
    markPaid: 'Markera som betald',
    draft: 'Utkast',
    sent: 'Skickad',
    paid: 'Betald',
    saved: 'Fakturan har sparats i den här webbläsaren.',
    needEmail: 'Fyll i kundens e-postadress först.',
    newConfirm: 'Skapa en ny faktura? Spara den nuvarande först om du vill behålla den.',
    printHint: 'Välj ”Spara som PDF” i utskriftsdialogen.',
    mailHint: 'Mejlet öppnas som ett utkast. Bifoga den sparade PDF-filen innan du skickar.',
    invoice: 'FAKTURA',
    draftStamp: 'UTKAST',
    recipientRef: 'Er referens',
    ourRef: 'Vår referens',
    invoiceSubject: 'Fakturan avser',
    paymentTerms: 'Betalningsvillkor',
    descriptionHead: 'Beskrivning',
    quantityHead: 'Antal',
    unitHead: 'Enhet',
    priceHead: 'Pris',
    totalHead: 'Total',
    subtotal: 'Totalt exkl. moms',
    vat: 'Moms',
    rounding: 'Öresutjämning',
    amountDue: 'Att betala',
    sendDate: 'Sätts vid utskick',
    invoiceEmailSubject: 'Faktura',
    emailBody: 'Här kommer fakturauppgifterna. PDF-filen är bifogad.',
  },
} as const;

const company = {
  name: 'TechSalem AB',
  address: 'Svampstigen 101',
  postal: '14440 Rönninge',
  email: 'support@techsalem.se',
  phone: '0700141376',
  website: 'www.techsalem.se',
  organization: '559608-4847',
  vat: 'SE559608484701',
  bankgiro: '5442-5277',
  swish: '1237102130',
};

// FIX: new Date() som default parameter ger build-fel i Next.js 16.
// Vi tar bort default-parametern och skickar alltid in datumet explicit.
function localDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function addDays(date: string, days: number) {
  if (!date) return '';
  const result = new Date(`${date}T12:00:00`);
  result.setDate(result.getDate() + days);
  return localDate(result);
}

// FIX: Skicka in 'today' som en sträng istället för att anropa new Date() här inne.
function createInvoice(today: string): Invoice {
  return {
    id: `new-${Date.now()}`,
    number: '',
    status: 'draft',
    issueDate: today,
    dueDate: addDays(today, 15),
    paymentTerms: '15',
    customerName: '',
    customerAddress: '',
    customerPostal: '',
    customerEmail: '',
    customerReference: '',
    sellerReference: '',
    subject: '',
    vatRate: '25',
    items: [{ description: '', quantity: '1', unit: 'timme', unitPrice: '' }],
  };
}

function numeric(value: string) {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function totals(invoice: Invoice) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + numeric(item.quantity) * numeric(item.unitPrice),
    0,
  );
  const vat =
    Math.round(((subtotal * numeric(invoice.vatRate)) / 100 + Number.EPSILON) * 100) / 100;
  const beforeRounding = subtotal + vat;
  const amountDue = Math.round(beforeRounding);
  return { subtotal, vat, rounding: amountDue - beforeRounding, amountDue };
}

function money(value: number) {
  return new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function invoiceNumber(year: string, saved: Invoice[]) {
  const prefix = `${year}-`;
  const highest = saved.reduce((max, invoice) => {
    if (!invoice.number.startsWith(prefix)) return max;
    return Math.max(max, Number(invoice.number.slice(prefix.length)) || 0);
  }, 0);
  return `${prefix}${String(highest + 1).padStart(3, '0')}`;
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  min,
  step,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  step?: string;
  inputMode?: 'decimal' | 'numeric' | 'text';
}) {
  return (
    <label className="grid gap-1.5 text-body-sm font-semibold text-zinc-950">
      {label}
      <input
        type={type}
        value={value}
        min={min}
        step={step}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-sm border border-line bg-white px-3 text-body-sm font-normal outline-none focus:border-purple focus:ring-2 focus:ring-purple/20"
      />
    </label>
  );
}

export function InvoiceBuilder({ locale }: { locale: Locale }) {
  const copy = text[locale];
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [saved, setSaved] = useState<Invoice[]>([]);
  const [notice, setNotice] = useState('');

  // amounts kräver att invoice finns, annars returnerar vi 0-värden
  const amounts = useMemo(() => {
    if (!invoice) return { subtotal: 0, vat: 0, rounding: 0, amountDue: 0 };
    return totals(invoice);
  }, [invoice]);

  useEffect(() => {
    const today = localDate(new Date()); // Här är det säkert att använda new Date() eftersom det körs i webbläsaren.

    try {
      const stored = localStorage.getItem(storageKey);
      const invoices = stored ? (JSON.parse(stored) as Invoice[]) : [];
      setSaved(Array.isArray(invoices) ? invoices : []);
    } catch {
      setSaved([]);
    }
    setInvoice(createInvoice(today));
  }, []);

  // Om invoice är null (under första renderingen) visar vi en laddningsskärm
  if (!invoice) {
    return (
      <section className="invoice-workspace bg-cloud py-8 md:py-10">
        <div className="site-container flex min-h-[50vh] items-center justify-center">
          <p className="text-body text-ink-muted">Loading invoice...</p>
        </div>
      </section>
    );
  }

  function update<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    if (!invoice) return;
    setInvoice((current) => (current ? { ...current, [key]: value } : current));
    setNotice('');
  }

  function saveInvoice(next = invoice, announce = true) {
    if (!next) return false;
    const updated = [next, ...saved.filter((item) => item.id !== next.id)];
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setSaved(updated);
      setInvoice(next);
      if (announce) setNotice(copy.saved);
      return true;
    } catch {
      setNotice(copy.localNotice);
      return false;
    }
  }

  function startNew() {
    if (!invoice) return;
    const hasData =
      invoice.customerName ||
      invoice.subject ||
      invoice.items.some((item) => item.description || item.unitPrice);
    if (hasData && !window.confirm(copy.newConfirm)) return;

    const today = localDate(new Date());
    setInvoice(createInvoice(today));
    setNotice('');
  }

  function markSent() {
    if (!invoice) return;
    const year = invoice.issueDate.slice(0, 4) || String(new Date().getFullYear());
    const next = {
      ...invoice,
      number: invoice.number || invoiceNumber(year, saved),
      status: 'sent' as const,
    };
    saveInvoice(next);
  }

  function createEmailDraft() {
    if (!invoice) return;
    if (!invoice.customerEmail.trim()) {
      setNotice(copy.needEmail);
      return;
    }
    saveInvoice(invoice, false);
    const subject = `${copy.invoiceEmailSubject} ${invoice.number || ''}`.trim();
    const body = [
      `Hej ${invoice.customerName || ''},`,
      '',
      copy.emailBody,
      `${copy.invoiceNumber}: ${invoice.number || copy.numberOnSend}`,
      `${copy.dueDate}: ${invoice.dueDate}`,
      `${copy.amountDue}: ${money(amounts.amountDue)} kr`,
      '',
      company.name,
    ].join('\n');
    window.location.href = `mailto:${encodeURIComponent(invoice.customerEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice(copy.mailHint);
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string) {
    if (!invoice) return;
    const items = invoice.items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item,
    );
    update('items', items);
  }

  function addItem() {
    if (!invoice) return;
    update('items', [
      ...invoice.items,
      { description: '', quantity: '1', unit: 'timme', unitPrice: '' },
    ]);
  }

  function removeItem(index: number) {
    if (!invoice || invoice.items.length === 1) return;
    update(
      'items',
      invoice.items.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  const statusLabel = copy[invoice.status];

  return (
    <section className="invoice-workspace bg-cloud py-8 md:py-10">
      <div className="site-container">
        <div className="mx-auto max-w-[1500px]">
          <div className="invoice-screen-only mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-h2 text-zinc-950">{copy.title}</h1>
              <p className="mt-2 text-body-sm text-ink-muted">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={startNew}
              className="min-h-11 rounded-sm border border-navy px-4 text-button text-navy hover:bg-white"
            >
              {copy.newInvoice}
            </button>
          </div>

          <div className="invoice-layout grid items-start gap-6 xl:grid-cols-[minmax(340px,420px)_minmax(0,1fr)]">
            <div className="invoice-editor grid gap-5">
              <aside className="rounded-sm border border-line bg-white p-5">
                <h2 className="text-title-18 font-bold text-zinc-950">{copy.savedInvoices}</h2>
                {saved.length ? (
                  <ul className="mt-3 grid max-h-56 gap-2 overflow-auto">
                    {saved.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setInvoice(item);
                            setNotice('');
                          }}
                          className={`w-full rounded-sm border px-3 py-2 text-left text-body-sm hover:bg-cloud ${item.id === invoice.id ? 'border-purple bg-lavender' : 'border-line'}`}
                        >
                          <span className="block font-semibold text-zinc-950">
                            {item.number || copy.numberOnSend} · {item.customerName || copy.draft}
                          </span>
                          <span className="mt-1 block text-ink-muted">
                            {item.issueDate} · {money(totals(item).amountDue)} kr
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-body-sm text-ink-muted">{copy.noInvoices}</p>
                )}
              </aside>

              <div className="rounded-sm border border-line bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-title-18 font-bold text-zinc-950">{copy.customer}</h2>
                  <span className="rounded-full bg-lavender px-3 py-1 text-caption font-bold text-purple">
                    {statusLabel}
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  <Field
                    label={copy.name}
                    value={invoice.customerName}
                    onChange={(v) => update('customerName', v)}
                  />
                  <Field
                    label={copy.address}
                    value={invoice.customerAddress}
                    onChange={(v) => update('customerAddress', v)}
                  />
                  <Field
                    label={copy.postal}
                    value={invoice.customerPostal}
                    onChange={(v) => update('customerPostal', v)}
                  />
                  <Field
                    label={copy.email}
                    type="email"
                    value={invoice.customerEmail}
                    onChange={(v) => update('customerEmail', v)}
                  />
                  <Field
                    label={copy.customerReference}
                    value={invoice.customerReference}
                    onChange={(v) => update('customerReference', v)}
                  />
                </div>
              </div>

              <div className="rounded-sm border border-line bg-white p-5">
                <h2 className="text-title-18 font-bold text-zinc-950">{copy.invoiceDetails}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field
                    label={copy.invoiceNumber}
                    value={invoice.number}
                    onChange={(v) => update('number', v)}
                  />
                  <Field
                    label={copy.sellerReference}
                    value={invoice.sellerReference}
                    onChange={(v) => update('sellerReference', v)}
                  />
                  <Field
                    label={copy.issueDate}
                    type="date"
                    value={invoice.issueDate}
                    onChange={(v) => {
                      update('issueDate', v);
                      update('dueDate', addDays(v, numeric(invoice.paymentTerms)));
                    }}
                  />
                  <Field
                    label={copy.dueDate}
                    type="date"
                    value={invoice.dueDate}
                    onChange={(v) => update('dueDate', v)}
                  />
                  <Field
                    label={copy.terms}
                    type="number"
                    min="0"
                    value={invoice.paymentTerms}
                    onChange={(v) => {
                      update('paymentTerms', v);
                      update('dueDate', addDays(invoice.issueDate, numeric(v)));
                    }}
                  />
                  <fieldset className="grid gap-2 sm:col-span-2">
                    <legend className="text-body-sm font-semibold text-zinc-950">
                      {copy.vatRate}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-body-sm font-semibold text-zinc-950">
                        {copy.presetVatRate}
                        <select
                          value={presetVatRates.includes(invoice.vatRate) ? invoice.vatRate : ''}
                          onChange={(event) => update('vatRate', event.target.value)}
                          className="min-h-11 rounded-sm border border-line bg-white px-3 text-body-sm font-normal outline-none focus:border-purple"
                        >
                          <option value="">{copy.customRateOption}</option>
                          {presetVatRates.map((rate) => (
                            <option key={rate} value={rate}>
                              {rate}%
                            </option>
                          ))}
                        </select>
                      </label>
                      <Field
                        label={copy.customVatRate}
                        value={presetVatRates.includes(invoice.vatRate) ? '' : invoice.vatRate}
                        onChange={(value) => update('vatRate', value)}
                        inputMode="decimal"
                      />
                    </div>
                  </fieldset>
                  <div className="sm:col-span-2">
                    <Field
                      label={copy.subject}
                      value={invoice.subject}
                      onChange={(v) => update('subject', v)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-line bg-white p-5">
                <h2 className="text-title-18 font-bold text-zinc-950">{copy.items}</h2>
                <div className="mt-4 grid gap-4">
                  {invoice.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 rounded-sm border border-line p-3 sm:grid-cols-2"
                    >
                      <div className="sm:col-span-2">
                        <Field
                          label={copy.description}
                          value={item.description}
                          onChange={(v) => updateItem(index, 'description', v)}
                        />
                      </div>
                      <Field
                        label={copy.quantity}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.quantity}
                        onChange={(v) => updateItem(index, 'quantity', v)}
                      />
                      <Field
                        label={copy.unit}
                        value={item.unit}
                        onChange={(v) => updateItem(index, 'unit', v)}
                      />
                      <div className="sm:col-span-2">
                        <Field
                          label={copy.unitPrice}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(v) => updateItem(index, 'unitPrice', v)}
                        />
                      </div>
                      {invoice.items.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-fit text-caption font-semibold text-red-text underline underline-offset-2"
                        >
                          {locale === 'sv' ? 'Ta bort rad' : 'Remove row'}
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="mt-4 min-h-10 rounded-sm border border-navy px-3 text-body-sm font-semibold text-navy hover:bg-cloud"
                >
                  + {copy.addItem}
                </button>
              </div>

              <div className="invoice-screen-only rounded-sm border border-line bg-white p-5">
                <p className="text-body-sm text-ink-muted">{copy.localNotice}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => saveInvoice()}
                    className="min-h-11 rounded-sm bg-navy px-4 text-button text-white hover:bg-navy-dark"
                  >
                    {copy.save}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="min-h-11 rounded-sm bg-red px-4 text-button text-white hover:brightness-90"
                  >
                    {copy.print}
                  </button>
                  <button
                    type="button"
                    onClick={createEmailDraft}
                    className="min-h-11 rounded-sm border border-navy px-4 text-button text-navy hover:bg-cloud"
                  >
                    {copy.emailDraft}
                  </button>
                  {invoice.status === 'draft' ? (
                    <button
                      type="button"
                      onClick={markSent}
                      className="min-h-11 rounded-sm border border-line px-4 text-button text-zinc-950 hover:bg-cloud"
                    >
                      {copy.markSent}
                    </button>
                  ) : invoice.status === 'sent' ? (
                    <button
                      type="button"
                      onClick={() => saveInvoice({ ...invoice, status: 'paid' })}
                      className="min-h-11 rounded-sm border border-line px-4 text-button text-zinc-950 hover:bg-cloud"
                    >
                      {copy.markPaid}
                    </button>
                  ) : null}
                </div>
                {notice ? (
                  <p role="status" className="mt-3 text-body-sm text-purple">
                    {notice}
                  </p>
                ) : null}
                <p className="mt-2 text-caption text-ink-muted">
                  {copy.printHint} {copy.mailHint}
                </p>
              </div>
            </div>

            <InvoicePaper
              invoice={invoice}
              statusLabel={statusLabel}
              locale={locale}
              amounts={amounts}
              copy={copy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InvoicePaper({
  invoice,
  statusLabel,
  locale,
  amounts,
  copy,
}: {
  invoice: Invoice;
  statusLabel: string;
  locale: Locale;
  amounts: ReturnType<typeof totals>;
  copy: (typeof text)[Locale];
}) {
  const sv = locale === 'sv';
  return (
    <article className="invoice-paper shadow-lg mx-auto flex w-full max-w-[210mm] flex-col border border-line bg-white p-6 sm:p-8 lg:p-[12mm]">
      <div className="flex min-h-28 items-start justify-between gap-8">
        <div className="text-navy">
          <p className="text-title-24 font-extrabold tracking-tight">
            TechSalem<span className="text-red">AB</span>
          </p>
          <p className="mt-1 text-caption font-bold tracking-[0.18em] uppercase">IT Support</p>
        </div>
        <div className="max-w-[48%] text-right">
          <p className="text-title-24 font-bold tracking-wide text-zinc-950">{copy.invoice}</p>
          <p
            className={`text-title-18 font-bold ${invoice.status === 'draft' ? 'text-red' : 'text-ink-muted'}`}
          >
            {invoice.status === 'draft' ? copy.draftStamp : statusLabel.toUpperCase()}
          </p>
          <div className="mt-4 grid gap-0.5 text-body-sm text-zinc-950">
            {invoice.customerName ? (
              <p className="font-bold">{invoice.customerName}</p>
            ) : (
              <p className="text-ink-muted">{sv ? 'Kundens namn' : 'Customer name'}</p>
            )}
            {invoice.customerAddress ? <p>{invoice.customerAddress}</p> : null}
            {invoice.customerPostal ? <p>{invoice.customerPostal}</p> : null}
            {invoice.customerEmail ? <p>{invoice.customerEmail}</p> : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 border border-line sm:w-[60%]">
        <div className="grid gap-y-3 p-4 text-body-sm">
          <PreviewField
            label={sv ? 'Fakturanr' : 'Invoice no.'}
            value={invoice.number || copy.sendDate}
          />
          <PreviewField label={copy.recipientRef} value={invoice.customerReference || '—'} />
          <PreviewField label={copy.ourRef} value={invoice.sellerReference || '—'} />
        </div>
        <div className="grid gap-y-3 border-l border-line p-4 text-body-sm">
          <PreviewField label={sv ? 'Datum' : 'Date'} value={invoice.issueDate || '—'} />
          <PreviewField label={sv ? 'Förfallodatum' : 'Due date'} value={invoice.dueDate || '—'} />
          <PreviewField
            label={copy.paymentTerms}
            value={`${invoice.paymentTerms} ${sv ? 'dagar' : 'days'}`}
          />
        </div>
      </div>

      <div className="mt-5 min-h-14 text-body-sm">
        <p className="font-bold">{copy.invoiceSubject}</p>
        <p className="mt-1">{invoice.subject || '—'}</p>
      </div>

      <table className="invoice-items mt-5 w-full border-collapse text-body-sm">
        <thead>
          <tr className="border-b border-line text-left font-bold">
            <th className="py-2 pr-2">{copy.descriptionHead}</th>
            <th className="w-12 px-1 py-2 text-right">{copy.quantityHead}</th>
            <th className="w-16 px-1 py-2 text-right">{copy.unitHead}</th>
            <th className="w-20 px-1 py-2 text-right">{copy.priceHead}</th>
            <th className="w-24 py-2 pl-2 text-right">{copy.totalHead}</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="border-b border-line align-top">
              <td className="py-3 pr-2">{item.description || '—'}</td>
              <td className="px-1 py-3 text-right">{item.quantity || '0'}</td>
              <td className="px-1 py-3 text-right">{item.unit || '—'}</td>
              <td className="px-1 py-3 text-right">{money(numeric(item.unitPrice))}</td>
              <td className="py-3 pl-2 text-right">
                {money(numeric(item.quantity) * numeric(item.unitPrice))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 ml-auto grid w-full max-w-[290px] gap-2 text-body-sm sm:w-[55%]">
        <PreviewTotal label={copy.subtotal} value={`${money(amounts.subtotal)} kr`} />
        <PreviewTotal
          label={`${copy.vat} ${invoice.vatRate}%`}
          value={`${money(amounts.vat)} kr`}
        />
        <PreviewTotal label={copy.rounding} value={`${money(amounts.rounding)} kr`} />
        <PreviewTotal label={copy.amountDue} value={`${money(amounts.amountDue)} kr`} prominent />
      </div>

      <div className="invoice-company-footer mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4 text-[8pt] leading-snug text-zinc-950 sm:grid-cols-4">
        <div>
          <p className="font-bold">{company.name}</p>
          <p>{company.address}</p>
          <p>{company.postal}</p>
        </div>
        <div>
          <p>{company.email}</p>
          <p>{company.phone}</p>
          <p>{company.website}</p>
        </div>
        <div>
          <p>Org. nr: {company.organization}</p>
          <p>Momsnr: {company.vat}</p>
          <p>{sv ? 'Godkänd för F-skatt' : 'Approved for F-tax'}</p>
        </div>
        <div>
          <p>Bankgiro-{company.bankgiro}</p>
          <p>Swish: {company.swish}</p>
          <p>F-Skatt godkänd</p>
          <p>Moms: {company.vat}</p>
        </div>
      </div>
    </article>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold text-zinc-950">{label}</p>
      <p className="mt-0.5 text-ink-muted">{value}</p>
    </div>
  );
}

function PreviewTotal({
  label,
  value,
  prominent = false,
}: {
  label: string;
  value: string;
  prominent?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 ${prominent ? 'border-t border-line pt-3 text-title-18 font-bold' : ''}`}
    >
      <span>{label}</span>
      <span className="text-right tabular-nums">{value}</span>
    </div>
  );
}
