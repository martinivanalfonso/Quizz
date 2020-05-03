// Decodes HTML entities such as #&quot
export const decodeString = (str: string) => {
  const textArea: HTMLTextAreaElement = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};