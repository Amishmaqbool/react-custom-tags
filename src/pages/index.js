import {Inter} from 'next/font/google';
import CustomMulti from '../components/customMultiSelect';
const inter = Inter ({subsets: ['latin']});

export default function Home () {
  return (
<>
<CustomMulti/>
</>
  );
}
