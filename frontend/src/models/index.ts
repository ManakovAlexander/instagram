export interface IPage {
  id: number;
  label: string;
  icon: any;
  path: string;
  component: any;
  show: (props: any) => boolean;
}
