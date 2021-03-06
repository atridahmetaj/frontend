import { MENU_CONFIGURATION } from '@ms-system/layout';
import { EXCEPTION_CONFIGURATION } from '@ms-system/core';

import { APP_MENU_ITEMS } from './menu-items.constants';
import { EXCEPTION_CONFIGURATIONS } from './exception.constants';

export const APP_CONFIGURATIONS_PROVIDERS = [
    { provide: MENU_CONFIGURATION, useValue: APP_MENU_ITEMS },
    {
        provide: EXCEPTION_CONFIGURATION,
        useValue: EXCEPTION_CONFIGURATIONS
    }
];