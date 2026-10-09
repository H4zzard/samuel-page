import { z } from "zod";

export const situationOptions = [
  "Imóvel penhorado",
  "Risco de penhora",
  "Leilão agendado",
  "Outra situação",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100),
  contact: z.string().trim().min(8, "Informe um telefone ou e-mail válido.").max(120),
  situation: z.enum(situationOptions, { message: "Selecione uma situação." }),
  city: z.string().trim().min(2, "Informe cidade e UF.").max(100),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "É necessário aceitar a Política de Privacidade.",
  }),
  attribution: z
    .record(z.string(), z.string().max(300))
    .optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
