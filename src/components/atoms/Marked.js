import React from "react"
import ReactDOM from "react-dom"
import marked, {hljs} from "marked"

var MarkdownEditor = React.createClass({
	getInitialState: function() {
		return {
			content: '### Type Markdown Here'
		}
	},
	handleChange: function(event) {
		this.setState({
			content: event.target.value
		})
	},
	rawMarkup: function() {
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function (code) {
				return hljs.highlightAuto(code).value
			}
		})

		var rawMarkup = marked(this.state.content, {sanitize: true})
		return {
			__html: rawMarkup
		}
	},
	render: function() {
		return (
			<div className="container">
				<h1>Markdown Parser</h1>
				<div className="row">
					<div className="form-group col-md-6" id="input">
						<label>Markdown</label>
						<textarea className="form-control" rows="5" id="inputText" defaultValue={this.state.content} onChange={this.handleChange}></textarea>
					</div>
					<div className="form-group col-md-6" id="output">
						<label>Output</label>
						<div id="outputText" dangerouslySetInnerHTML={this.rawMarkup()}></div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<MarkdownEditor />,
	document.getElementById('app')
)