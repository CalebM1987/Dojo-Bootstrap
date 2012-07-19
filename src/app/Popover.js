/* ==========================================================
 * Popover.js v0.0.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
define([ 
	"dojo/_base/declare", 
	"dojo/query", 
	"dojo/_base/lang", 
	'dojo/on',
	'dojo/dom-class',
	'dojo/dom-construct',
	"dojo/dom-attr",
	'dojo/html',
	'app/support/node-data',
	'app/Tooltip',
	"dojo/NodeList-dom", 
	"dojo/domReady!" 
], function (declare, query, lang, on, domClass, domConstruct, domAttr, html, nodeData, Tooltip) {
	var Popover = declare(Tooltip,{
		"-chains-": { constructor: "manual" },
		constructor: function(element, options){
			options = lang.mixin({
				placement: 'right',
				content: '',
				template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
			}, (options || {}));
			this.init('popover', element, options);
		},
		setContent: function(){
			var tip = this.tip();
			var title = this.getTitle();
			var content = this.getContent();
			html.set(query('.popover-title', tip)[0], title);
			html.set(query('.popover-content > *', tip)[0], content);
			domClass.remove(tip, 'fade in top bottom left right');
		},
		hasContent: function(){
			return this.getTitle() || this.getContent();
		},
		getContent: function(){
			return domAttr.get(this.domNode, 'data-content')
				|| (typeof this.options.content == 'function' ? this.options.content.call(this.domNode) : this.options.content);
		},
		tip: function(){
			return this.tipNode = (this.tipNode) ? this.tipNode : domConstruct.toDom(this.options.template);
		}
	});
	
	lang.extend(query.NodeList, {
		popover: function(option){
			return this.forEach(function(node){
		        var options = (lang.isObject(option)) ? option : {};
				var data = nodeData.get(node, 'popover');
				if(!data){ nodeData.set(node, 'popover', (data = new Popover(node, options))) }
				if(lang.isString(option)){ 
					data[option].call(data);
				}
			});
		}
	});
	return Popover;
});