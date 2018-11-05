import { IMedia } from 'src/models/media';

export const readFile = async (
  ev: React.ChangeEvent<HTMLInputElement>
): Promise<IMedia | null> => {
  return new Promise<IMedia | null>((resolve, reject) => {
    try {
      if (!ev.currentTarget.files || !ev.currentTarget.files[0]) {
        resolve(null);
        return;
      }
      const file = ev.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ file, imagePreviewUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
};
