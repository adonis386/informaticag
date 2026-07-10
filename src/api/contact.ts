export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  projectType?: string;
  website?: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? 'Error al enviar el formulario');
  }
};
