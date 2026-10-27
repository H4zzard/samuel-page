import { z } from "zod";

export const situationOptions = [
  "Imóvel penhorado",
  "Risco de penhora",
  "Leilão agendado",
  "Outra situação",
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
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "É necessário aceitar a Política de Privacidade.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
