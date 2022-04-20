const getters = {
    tagsList: state => state.app.tagsList,
    collapse: state => state.app.collapse,
    token: state => state.user.token,
    username: state => state.user.name,
    sidebarItems: state => state.app.sidebarItems
}
export default getters
