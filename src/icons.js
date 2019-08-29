import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFire,
  faUser,
  faHeart as fasHeart,
  faStar as fasStar,
  faCheck,
  faCity,
  faGlobe,
  faInfoCircle,
  faTimesCircle,
  faPlus,
  faTrash,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faStar as farStar,
  faCheckSquare,
  faSquare
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faFire,
  faUser,
  faCheck,
  faCity,
  faGlobe,
  faInfoCircle,
  faTimesCircle,
  fasHeart,
  farHeart,
  fasStar,
  farStar,
  faCheckSquare,
  faSquare,
  faPlus,
  faTrash,
  faUndo
);

export default library;
