# Materialized Path
Store a tree in *any* kind of database (SQL/document/K-V) in a way that makes your queries fast and your data model simple, unlike some of the alternatives:
- nested tree is insanely difficult to insert nodes into, and to move/delete them around
- adjacency list (`parent_id => id`) is quick and easy to deal with, until you want to pull out the full tree path (which you have to do for something like a comment system), at which point you'll be dealing with big, complex recursive queries that take too long

The materialized path pattern allows you to deal with individual items easily just like with adjacency list, except now it also fetches trees quickly!
- you can CRUD on any element by id
- you can fetch subtrees of any element (even the root) quickly
- the structure of the path allows every single one of these operations to be dead simple
- this pattern does not require your data to be structured in any specific way - you can use the path as the primary key, or use it as part of a compound index, etc.

Unlike other implementations of the materialized path pattern (across many languages), this library:
- is suited for sorting by path, which is useful for a threaded comment system (think Disqus)
- can sort *both ways* - efficiently at that - unlike other libraries that only allow you to sort one-way
- does not involve padding - even when sorting from the reverse direction
- is suited for use in distributed environment, thanks to the UUID-based paths
- saves space compared to other UUID-based implementations
- is simple and data store-agnostic by nature
- is pretty darn fast!

## Sample Usage
```javascript
const path = require('./lib/path')
const parent = path() // modify it as you'd like, and insert into the database
const child = path(parent) // direct descendant of the parent

db.save([parent, child]) // store it however you'd like!
```
