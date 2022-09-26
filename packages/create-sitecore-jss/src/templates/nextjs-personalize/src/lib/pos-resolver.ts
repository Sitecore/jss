import { EnvHelper } from '@sitecore-jss/sitecore-jss-nextjs';

// This class is used to get point of sale identifier(s). Resolving from env variable, but it can be expanded or change in future if needed.
export class PosResolver{
    static resolve = (locale: string): string => {
        try {
            // POS can be multi-valued (one entry per locale) or single valued so we parse it
            // POS must be valid in order to save events (domain name might be taken but it must be defined in CDP settings)
            const parsedPos = EnvHelper.parseEnvValue(process.env.NEXT_PUBLIC_CDP_POINTOFSALE);
            if (typeof parsedPos == 'string')
                return parsedPos;
            else
                return parsedPos[locale];
        }
        catch (error) {
            console.log(error);
            return '';
        }
    }
}
