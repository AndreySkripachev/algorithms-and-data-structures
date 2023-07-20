# Linked List

## What is it?

A linked list (in this case, a unidirectional list) is a data structure consisting of nodes. In turn, nodes consist of two components:
1 - Own value of the node
2 - Reference to the next node

The general view of the interface of a unidirectional linked list is as follows:
```typescript
interface LinkedList {
  /** Own value of the node. */
  value: any;

  /** Reference to the next node. */
  tail: LinkedList | null;
}
```

In graphical form, it can be represented as:
```
  Value of the list node
  |
  |    Container with a link to the next element.
  ↓    ↓
——————————
| 62 | ● |  // 1-st element. 
——————————
       ↓
——————————
| 54 | ● |  // 2-nd element.
——————————
       ↓
——————————
| 11 | ● |  // 3-rd element.
——————————
       ↓
       ∅    // End of list.

```

## Basic principles of working with the list.

### Insertion

Insertion is done according to the following principle: we take a node (node A), after which we want to insert another node (node B), then we must change the links in these nodes so that node A refers to node B, and node B refers to the node that was previously referred to by node A

What am I mean?
```
 .......
       ↓
——————————
| 62 | ● |  
——————————          ——————————
       ↓            | 54 | ● |  The node we want to insert between the first and 
——————————          ——————————  second node
| 11 | ● |  
——————————
       ↓
 .......
```
And then we just change the links so that our node is inserted between the first node and the second node
```
 .......
       ↓
——————————
| 62 | ● |  ---------------┒
——————————                 ↓	
                    ——————————
                    | 54 | ● |  
                    ——————————  
——————————                 |
| 11 | ● | ←---------------┚
——————————
       ↓
 .......
```
And eventually a new node was added without losing the connection to the old ones.
```
 .......
       ↓
——————————
| 62 | ● |   
——————————
       ↓
——————————
| 54 | ● |  
——————————
       ↓
——————————
| 11 | ● |  
——————————
       ↓
 .......
```

### Deletion

Deleting nodes works like this: we take the node preceding the one we want to delete and change the tail to the tail of the element to be deleted and we break the connection between the element to be deleted and its tail.

Example:
```
A -> B -> C
```
Then we change the tail at node A
```
A -> C ⇍ B // We also break node B's connection to node C and delete it
```
