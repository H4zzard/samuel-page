import { z } from "zod";

export const situationOptions = [
  "Imóvel penhorado",
  "Risco de penhora",
  "Leilão agendado",
  "Outra situação",
] as const;

export const propertyValueOptions = [
  "Até R$ 500 mil",
  "De R$ 500 mil a R$ 1 milhão",
  "Acima de R$ 1 milhão",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp com DDD.")
    .max(20, "Revise o número informado.")
    .regex(/^[+()\d\s-]+$/, "Use apenas números e os símbolos +, (, ), espaço ou hífen."),
  situation: z.enum(situationOptions, { message: "Selecione uma situação." }),
  propertyValue: z.enum(propertyValueOptions, { message: "Selecione o valor do imóvel." }),
  city: z.string().trim().min(2, "Informe cidade e UF.").max(100),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "É necessário aceitar a Política de Privacidade.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
