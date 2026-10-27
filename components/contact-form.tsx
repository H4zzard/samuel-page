"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { contactSchema, situationOptions, type ContactInput } from "@/lib/contact-schema";
import { readAttribution, trackEvent } from "@/lib/tracking";

type ContactFormProps = {
  whatsappNumber: string;
  leadsWebhookUrl: string;
  location: "contact_section" | "contact_modal";
};

export function ContactForm({ whatsappNumber, leadsWebhookUrl, location }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyAccepted: false },
    mode: "onChange",
  });

  function onSubmit(values: ContactInput) {
    if (!whatsappNumber) return;
    const leadId = crypto.randomUUID();
    const leadPayload = {
      formKey: "imovel_site_v1",
      leadId,
      submittedAt: new Date().toISOString(),
      pageService: "penhora_imovel",
      pageUrl: window.location.href,
      formLocation: location,
      name: values.name,
      whatsapp: values.whatsapp,
      situation: values.situation,
      privacyAccepted: values.privacyAccepted,
      attribution: readAttribution(),
    };

    if (leadsWebhookUrl) {
      const body = JSON.stringify(leadPayload);
      const beaconSent = navigator.sendBeacon?.(
        leadsWebhookUrl,
        new Blob([body], { type: "text/plain;charset=UTF-8" }),
      );
      if (!beaconSent) {
        void fetch(leadsWebhookUrl, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body,
        }).catch(() => undefined);
      }
    }

    const message = [
      "Olá, Dr. Samuel.",
      "Vim pelo site advsamuelsantos.com.br e preciso de ajuda com penhora de imóveis.",
      "",
      `Nome: ${values.name}`,
      `WhatsApp: ${values.whatsapp}`,
      `Situação: ${values.situation}`,
    ].join("\n");

    trackEvent("contact_form_submit", { form_location: location, destination: "whatsapp" });
    window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-row">
        <label>Nome<input autoComplete="name" required {...register("name")} aria-invalid={!!errors.name} /></label>
        <label>WhatsApp<input autoComplete="tel" inputMode="tel" required placeholder="(11) 99999-9999" {...register("whatsapp")} aria-invalid={!!errors.whatsapp} /></label>
      </div>
      <label className="field-full">Situação da penhora
        <select defaultValue="" required {...register("situation")} aria-invalid={!!errors.situation}>
          <option value="" disabled>Selecione</option>
          {situationOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <div className="form-errors" aria-live="polite">
        {Object.values(errors)[0]?.message && <p>{String(Object.values(errors)[0]?.message)}</p>}
      </div>
      <label className="check-field">
        <input type="checkbox" required {...register("privacyAccepted")} />
        <span>Li e aceito a <Link href="/politica-de-privacidade" target="_blank">Política de Privacidade</Link>. Não inclua documentos ou detalhes confidenciais.</span>
      </label>
      <button className="button button-gold form-submit" type="submit" disabled={!isValid || isSubmitting || !whatsappNumber}>
        <MessageCircle aria-hidden="true" size={18} />
        Enviar pelo WhatsApp
      </button>
      {!isValid && <p className="form-config-note">Preencha todos os campos e aceite a Política de Privacidade para habilitar o envio.</p>}
      {!whatsappNumber && <p className="form-config-note">O número do WhatsApp precisa ser configurado antes do envio.</p>}
    </form>
  );
}
