import { doPost } from './post_api';
import { onOpen, doPayloadGenerate } from './gsheets_menu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

// post handler
global.doPost = doPost;

// google sheets menu handler
global.onOpen = onOpen;

// our menu button handler
global.doPayloadGenerate = doPayloadGenerate;
