import Team from "../Team"

type League = {
    userTeam: Team,
    day: number
};

export const createLeague = (userTeam: Team) => {
    return {
        userTeam,
        day: 1
    };
}

export default League;