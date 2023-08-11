interface Props{
    currentUserId: string;
    accountId: string;
    accountType: string
}

const PostsTab = async ({currentUserId, accountId, accountType} : Props) => {
    return (
        <section>
            PostsTab
        </section>
    )
}

export default PostsTab;