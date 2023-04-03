import { KittyPostLike } from './KittyPostLike';
import { Kitty } from './Kitty';
import { Prruwner } from './Prruwner';
import { CowMment } from './CowMment';
export class KittyPost {
  kittyPostId: number;
  prruwner: Prruwner;
  kitty: Kitty;
  pawscture: String;
  furrscription: String;
  postMiauDate: Date;
  kittyPostLikes: KittyPostLike[];
  cowMments: CowMment[];
}
