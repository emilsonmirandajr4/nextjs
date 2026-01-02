declare module "@qwik.dev/partytown" {
    import { ComponentType, ReactNode } from "react";

    export interface PartytownProps {
        debug?: boolean;
        forward?: string[];
        lib?: string;
        loadScriptsOnMainThread?: string[];
        nonce?: string;
        resolveUrl?: (url: URL, location: Location) => URL | undefined | null;
    }

    export const Partytown: ComponentType<PartytownProps>;
}
