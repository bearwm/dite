import { platform } from 'os';

export const PLATFORM = platform();

export const OS = {
    MACOS: 'darwin',
    WINDOWS: 'win32',
};
