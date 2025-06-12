export const votesStoriesAddDto = (IdUser, IdStories, Vote) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:0,
        IdUser,
        IdStories,
        Vote,
        DateVote:dateCurrent,
        CreationDate:dateCurrent,
        
        ChangeUser:IdUser,
      };
    };
