export function readFile(f: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();

		reader.onload = async () => res(reader.result as string);
    reader.onerror = (e) => rej(e);

		reader.readAsDataURL(f);
  });
}