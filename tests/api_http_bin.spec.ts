import { test, expect } from '@playwright/test';
import { ApihttpBin } from '../API/APIhttpBin';
import moment from 'moment';

test.describe('HTTP Bit Suite-', async () => {
    test('httpbin get', async ({ page }) => {
        const day = moment().format('ddd');
        console.log(day);

        const url = 'https://playwright.dev/';

        await test.step(`get`, async () => {
            const api = new ApihttpBin();
            const res = await api.httpBinGet(url);
            expect(res.status).toBe(200);
            expect(res.statusText).toBe('OK');
            expect(res.headers.date).toContain(day);
        });
    });
});
