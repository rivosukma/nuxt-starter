export default defineEventHandler((event) => {
    const query = getQuery(event);
    const cursor = parseInt(query.page) || 0;
    const pageSize = parseInt(query.pageSize) || 5;

    const data = Array(pageSize)
        .fill(0)
        .map((_, i) => {
            return {
                name:
                    'Project ' + (i + cursor) + ` (server time: ${Date.now()})`,
                id: i + cursor
            };
        });

    const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null;
    const previousId = cursor > -10 ? data[0].id - pageSize : null;

    const hasMore = data.length >= cursor;

    return { data, nextId, previousId, hasMore };
});
