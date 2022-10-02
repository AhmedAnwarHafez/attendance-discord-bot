## User stories

When a student runs `/attend` in any text channel in thier cohort's category, the following should happen:
1. read server `nickname`
1. read `username` and `id`
1. read the `category` name
1. insert a new database record

When a teacher runs `/list` from any cohort text channels, the following should happen:
1. read the category name
1. get today's date
1. query the database to get a list of students and their attendance statuses
1. reply to the sender with the following reply message:
```
| Student | In the space | Since       |   
|---------|--------------|-------------|
| Alice   | Yes          | 30 min ago  |   
| Bob     | No           | an hour ago |   
```

Bonus: only teachers with specific roles can run `/list`