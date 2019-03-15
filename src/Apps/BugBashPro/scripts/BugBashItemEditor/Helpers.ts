import { equals } from "azure-devops-ui/Core/Util/String";
import { IBugBashItem } from "BugBashPro/Shared/Contracts";
import { ITeamAwareState } from "Common/Redux/Teams/Contracts";
import { getTeam } from "Common/Redux/Teams/Selectors";
import { isNullOrWhiteSpace } from "Common/Utilities/String";
import { TitleFieldMaxLength } from "./Constants";
import { IBugBashItemEditorAwareState } from "./Redux/Draft/Contracts";

export function isBugBashItemValid(state: IBugBashItemEditorAwareState & ITeamAwareState, bugBashItem: IBugBashItem): boolean {
    const { title, teamId, rejectReason } = bugBashItem;
    return isTitleValid(title) && isTeamValid(state, teamId) && (!rejectReason || rejectReason.length <= TitleFieldMaxLength);
}

function isTeamValid(state: ITeamAwareState, teamId: string): boolean {
    return !isNullOrWhiteSpace(teamId) && getTeam(state, teamId) !== undefined;
}

function isTitleValid(title: string): boolean {
    return !isNullOrWhiteSpace(title) && title.length <= TitleFieldMaxLength;
}

export function isBugBashItemDirty(originalBugBashItem: IBugBashItem, updatedBugBashItem: IBugBashItem): boolean {
    const { title = "", teamId = "", description = "", rejectReason = "", rejected } = updatedBugBashItem;
    const {
        title: orig_title = "",
        teamId: orig_teamId = "",
        description: orig_description = "",
        rejectReason: orig_rejectReason = "",
        rejected: orig_rejected
    } = originalBugBashItem;

    return (
        !equals(title, orig_title) ||
        !equals(teamId, orig_teamId, true) ||
        !equals(description, orig_description, true) ||
        rejected !== orig_rejected ||
        !equals(rejectReason, orig_rejectReason, true)
    );
}
