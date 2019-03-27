import { BugBashEditorPanel } from "BugBashPro/Editors/BugBashEditor";
import { useActionCreators } from "Common/Hooks/useActionCreators";
import { useMappedState } from "Common/Hooks/useMappedState";
import * as React from "react";
import {
    BugBashEditorPortalActions,
    getEditBugBashId,
    IBugBashEditorPortalAwareState,
    isBugBashEditorPortalOpen,
    shouldReadFromCache
} from "../Redux";

interface IDynamicBugBashEditorPortalStateProps {
    panelOpen: boolean;
    bugBashId?: string;
    readFromCache: boolean;
}

function mapStateToProps(state: IBugBashEditorPortalAwareState): IDynamicBugBashEditorPortalStateProps {
    return {
        panelOpen: isBugBashEditorPortalOpen(state),
        bugBashId: getEditBugBashId(state),
        readFromCache: shouldReadFromCache(state)
    };
}

const Actions = {
    dismissPortal: BugBashEditorPortalActions.dismissPortal
};

export function DynamicBugBashEditorPortal() {
    const { panelOpen, bugBashId, readFromCache } = useMappedState(mapStateToProps);
    const { dismissPortal } = useActionCreators(Actions);

    if (!panelOpen) {
        return null;
    }

    return <BugBashEditorPanel bugBashId={bugBashId} onDismiss={dismissPortal} readFromCache={readFromCache} />;
}
