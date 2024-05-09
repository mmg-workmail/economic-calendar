export interface Api {
  body?: {};
  method?: string;
  immediate?: boolean;
  lazy?: boolean;
  deep?: boolean;
  watch?: Ref<any>[];
}
