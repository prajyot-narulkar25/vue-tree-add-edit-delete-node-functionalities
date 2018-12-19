<template>
  <div class="hello">
    <div class="examples">
        <div class="example">
          <div class="example-tree">
            <tree :data="data" :options="opts" :filter="filter" ref="tree">
              <div slot-scope="{ node }" class="node-container">
                <div class="node-text">{{ node.text }}</div>
                <div class="node-controls">
                  <a href="#" @mouseup.stop="editNode(node)">Edit&nbsp;</a>
                  <a href="#" @mouseup.stop="removeNode(node)">Remove&nbsp;</a>
                  <a href="#" @mouseup.stop="addChildNode(node)">Add child</a>
                </div>
              </div>
            </tree>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
     data: () => ({

          data: getData(),
          filter: null,
          opts: {
          	minFetchDelay: 1000,
            fetchData: (node) => {
            	return Promise.resolve(data[node.id - 1])
            },
          }
        }),

        filters: {
          time(time) {
            return +time
          }
        },

        methods: {
          editNode(node, e) {
            node.startEditing()
          },

          removeNode(node) {
            if (confirm('Are you sure?')) {
              node.remove()
            }
          },

          addChildNode(node) {
            if (node.enabled()) {
            	node.append('New Node')
            }
          },

          initEventViewer(event) {
            const events = this.events

            return function (node, newNode) {
              let nodeText = '-'
              let targetNode = newNode && newNode.text ? newNode : node

              if (targetNode && targetNode.text) {
                nodeText = targetNode.text
              }

              events.push(
                Object.assign(
                  {},
                  event,
                  { time: new Date, nodeText, id: key++ }
                )
              )

              console.log(event, arguments)
            }
          }
        }
      }

      function getData() {
        return new Promise(resolve => {
          setTimeout(_ => {
            resolve([
              {
                "text": "Introduction",
                "isBatch": true,
                "id": 1
              },
              {
                "text": "Part I: Fundamentals",
                "isBatch": true,
                "id": 2
              },
              {
                "text": "Data Types and Variables",
                "isBatch": true,
                "id": 3
              }
            ])
          }, 100)
        })
      }
      var data = [
	[
    { "text": "Who Should Read This Book?" },
    { "text": "How to Read This Book" },
    { "text": "What’s in This Book?" },
    { "text": "Have Fun!" }
  ],
  [
    { "text": "Naming Variables" },
    { "text": "Creating New Variables Using Math", "state": { "disabled": true } },
    { "text": "Incrementing and Decrementing" },
    { "text": "+= (plus-equals) and –= (minus-equals)" }
  ],
  [
    { "text": "Interactive Programming" },
    { "text": "Find the Buried Treasure!", "state": { "disabled": true, "expanded": true }, "children": [
      { "text": "#1: A Snowman-Drawing Function" },
      { "text": "#2: Drawing an Array of Points" },
      { "text": "#3: Painting with Your Mouse" },
      { "text": "#4: Drawing the Man in Hangman" }
    ]},
    { "text": "Object-Oriented Programming" }
  ]


]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-tree {
  width: 50%;
}

.filter-field {
  display: block;
  width: 100%;
  padding: 3px;
}

.events-table {
  width: 100%;
  margin-top: 15px;
}

.events-table-header {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  background-color: #fff;
  text-align: left;
  display: flex;
  justify-content: space-between;

}

.events-table .event:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.events-table .event {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
  display: flex;
}

.events-table .event > span,
.events-table-header > span {
  flex-basis: 25%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.node-controls a {
  color: #ff14ce
}
</style>
