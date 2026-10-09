"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { contactSchema, situationOptions, type ContactInput } from "@/lib/contact-schema";
import { trackEvent } from "@/lib/tracking";

type ContactFormProps = {
  whatsappNumber: string;
  location: "contact_section" | "contact_modal";
};

export function ContactForm({ whatsappNumber, location }: ContactFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyAccepted: false },
    mode: "onChange",
  });

  function onSubmit(values: ContactInput) {
    if (!whatsappNumber) return;
    const message = [
      "Olá, Dr. Samuel.",
      "Vim pelo site advsamuelsantos.com.br e preciso de ajuda com penhora de imóveis.",
      "",
      `Nome: ${values.name}`,
      `Contato: ${values.contact}`,
      `Situação: ${values.situation}`,
      `Cidade/UF: ${values.city}`,
    ].join("\n");

    trackEvent("contact_form_submit", { form_location: location, destination: "whatsapp" });
    window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-row">
        <label>Nome<input autoComplete="name" required {...register("name")} aria-invalid={!!errors.name} /></label>
        <label>Contato<input autoComplete="tel" required placeholder="Telefone ou e-mail" {...register("contact")} aria-invalid={!!errors.contact} /></label>
      </div>
      <div className="field-row">
        <label>Tipo de situação
          <select defaultValue="" required {...register("situation")} aria-invalid={!!errors.situation}>
            <option value="" disabled>Selecione</option>
            {situationOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>Cidade/UF<input autoComplete="address-level2" required placeholder="Ex.: Campinas/SP" {...register("city")} aria-invalid={!!errors.city} /></label>
      </div>
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
