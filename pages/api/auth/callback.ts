import { ExternalProvider, SaleorExternalAuth } from '@saleor/auth-sdk';
import { createSaleorExternalAuthHandler } from '@saleor/auth-sdk/next'

const SaleorURL = process.env.NEXT_PUBLIC_SALEOR_URL;
if (!SaleorURL) throw new Error('NEXT_PUBLIC_SALEOR_URL is not set');

export const externalAuth = new SaleorExternalAuth(SaleorURL, ExternalProvider.OpenIDConnect)
export default createSaleorExternalAuthHandler(externalAuth);
