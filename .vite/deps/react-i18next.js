import { i as __toESM, t as __commonJSMin } from "./chunk-C-Qwzh9l.js";
import { t as require_react } from "./react.js";
import { keyFromSelector as keysFromSelector } from "./i18next.js";
//#region node_modules/void-elements/index.js
var require_void_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This file automatically generated from `pre-publish.js`.
	* Do not manually edit.
	*/
	module.exports = {
		"area": true,
		"base": true,
		"br": true,
		"col": true,
		"embed": true,
		"hr": true,
		"img": true,
		"input": true,
		"link": true,
		"meta": true,
		"param": true,
		"source": true,
		"track": true,
		"wbr": true
	};
}));
//#endregion
//#region node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_void_elements = /* @__PURE__ */ __toESM(require_void_elements());
var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function n(n) {
	var r = {
		type: "tag",
		name: "",
		voidElement: !1,
		attrs: {},
		children: []
	}, i = n.match(/<\/?([^\s]+?)[/\s>]/);
	if (i && (r.name = i[1], (import_void_elements.default[i[1]] || "/" === n.charAt(n.length - 2)) && (r.voidElement = !0), r.name.startsWith("!--"))) {
		var s = n.indexOf("-->");
		return {
			type: "comment",
			comment: -1 !== s ? n.slice(4, s) : ""
		};
	}
	for (var a = new RegExp(t), c = null; null !== (c = a.exec(n));) if (c[0].trim()) if (c[1]) {
		var o = c[1].trim(), l = [o, ""];
		o.indexOf("=") > -1 && (l = o.split("=")), r.attrs[l[0]] = l[1], a.lastIndex--;
	} else c[2] && (r.attrs[c[2]] = c[3].trim().substring(1, c[3].length - 1));
	return r;
}
var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g, i = /^\s*$/, s = Object.create(null);
function a(e, t) {
	switch (t.type) {
		case "text": return e + t.content;
		case "tag": return e += "<" + t.name + (t.attrs ? function(e) {
			var t = [];
			for (var n in e) t.push(n + "=\"" + e[n] + "\"");
			return t.length ? " " + t.join(" ") : "";
		}(t.attrs) : "") + (t.voidElement ? "/>" : ">"), t.voidElement ? e : e + t.children.reduce(a, "") + "</" + t.name + ">";
		case "comment": return e + "<!--" + t.comment + "-->";
	}
}
var c = {
	parse: function(e, t) {
		t || (t = {}), t.components || (t.components = s);
		var a, c = [], o = [], l = -1, m = !1;
		if (0 !== e.indexOf("<")) {
			var u = e.indexOf("<");
			c.push({
				type: "text",
				content: -1 === u ? e : e.substring(0, u)
			});
		}
		return e.replace(r, function(r, s) {
			if (m) {
				if (r !== "</" + a.name + ">") return;
				m = !1;
			}
			var u, f = "/" !== r.charAt(1), h = r.startsWith("<!--"), p = s + r.length, d = e.charAt(p);
			if (h) {
				var v = n(r);
				return l < 0 ? (c.push(v), c) : ((u = o[l]).children.push(v), c);
			}
			if (f && (l++, "tag" === (a = n(r)).type && t.components[a.name] && (a.type = "component", m = !0), a.voidElement || m || !d || "<" === d || a.children.push({
				type: "text",
				content: e.slice(p, e.indexOf("<", p))
			}), 0 === l && c.push(a), (u = o[l - 1]) && u.children.push(a), o[l] = a), (!f || a.voidElement) && (l > -1 && (a.voidElement || a.name === r.slice(2, -1)) && (l--, a = -1 === l ? c : o[l]), !m && "<" !== d && d)) {
				u = -1 === l ? c : o[l].children;
				var x = e.indexOf("<", p), g = e.slice(p, -1 === x ? void 0 : x);
				i.test(g) && (g = " "), (x > -1 && l + u.length >= 0 || " " !== g) && u.push({
					type: "text",
					content: g
				});
			}
		}), c;
	},
	stringify: function(e) {
		return e.reduce(function(e, t) {
			return e + a("", t);
		}, "");
	}
};
//#endregion
//#region node_modules/react-i18next/dist/es/utils.js
var warn = (i18n, code, msg, rest) => {
	const args = [msg, {
		code,
		...rest || {}
	}];
	if (i18n?.services?.logger?.forward) return i18n.services.logger.forward(args, "warn", "react-i18next::", true);
	if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
	if (i18n?.services?.logger?.warn) i18n.services.logger.warn(...args);
	else if (console?.warn) console.warn(...args);
};
var alreadyWarned = {};
var warnOnce = (i18n, code, msg, rest) => {
	if (isString(msg) && alreadyWarned[msg]) return;
	if (isString(msg)) alreadyWarned[msg] = /* @__PURE__ */ new Date();
	warn(i18n, code, msg, rest);
};
var loadedClb = (i18n, cb) => () => {
	if (i18n.isInitialized) cb();
	else {
		const initialized = () => {
			setTimeout(() => {
				i18n.off("initialized", initialized);
			}, 0);
			cb();
		};
		i18n.on("initialized", initialized);
	}
};
var loadNamespaces = (i18n, ns, cb) => {
	i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
var loadLanguages = (i18n, lng, ns, cb) => {
	if (isString(ns)) ns = [ns];
	if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
	ns.forEach((n) => {
		if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
	});
	i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
var hasLoadedNamespace = (ns, i18n, options = {}) => {
	if (!i18n.languages || !i18n.languages.length) {
		warnOnce(i18n, "NO_LANGUAGES", "i18n.languages were undefined or empty", { languages: i18n.languages });
		return true;
	}
	return i18n.hasLoadedNamespace(ns, {
		lng: options.lng,
		precheck: (i18nInstance, loadNotPending) => {
			if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
		}
	});
};
var getDisplayName = (Component) => Component.displayName || Component.name || (isString(Component) && Component.length > 0 ? Component : "Unknown");
var isString = (obj) => typeof obj === "string";
var isObject = (obj) => typeof obj === "object" && obj !== null;
//#endregion
//#region node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
	"&amp;": "&",
	"&#38;": "&",
	"&lt;": "<",
	"&#60;": "<",
	"&gt;": ">",
	"&#62;": ">",
	"&apos;": "'",
	"&#39;": "'",
	"&quot;": "\"",
	"&#34;": "\"",
	"&nbsp;": " ",
	"&#160;": " ",
	"&copy;": "©",
	"&#169;": "©",
	"&reg;": "®",
	"&#174;": "®",
	"&hellip;": "…",
	"&#8230;": "…",
	"&#x2F;": "/",
	"&#47;": "/"
};
var unescapeHtmlEntity = (m) => htmlEntities[m];
var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);
//#endregion
//#region node_modules/react-i18next/dist/es/defaults.js
var defaultOptions = {
	bindI18n: "languageChanged",
	bindI18nStore: "",
	transEmptyNodeValue: "",
	transSupportBasicHtmlNodes: true,
	transWrapTextNodes: "",
	transKeepBasicHtmlNodesFor: [
		"br",
		"strong",
		"i",
		"p"
	],
	useSuspense: true,
	unescape,
	transDefaultProps: void 0
};
var setDefaults = (options = {}) => {
	defaultOptions = {
		...defaultOptions,
		...options
	};
};
var getDefaults = () => defaultOptions;
//#endregion
//#region node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
var setI18n = (instance) => {
	i18nInstance = instance;
};
var getI18n = () => i18nInstance;
//#endregion
//#region node_modules/react-i18next/dist/es/TransWithoutContext.js
var hasChildren = (node, checkLength) => {
	if (!node) return false;
	const base = node.props?.children ?? node.children;
	if (checkLength) return base.length > 0;
	return !!base;
};
var getChildren = (node) => {
	if (!node) return [];
	const children = node.props?.children ?? node.children;
	return node.props?.i18nIsDynamicList ? getAsArray(children) : children;
};
var hasValidReactChildren = (children) => Array.isArray(children) && children.every(import_react.isValidElement);
var getAsArray = (data) => Array.isArray(data) ? data : [data];
var mergeProps = (source, target) => {
	const newTarget = { ...target };
	newTarget.props = {
		...target.props,
		...source.props
	};
	return newTarget;
};
var getValuesFromChildren = (children) => {
	const values = {};
	if (!children) return values;
	const getData = (childs) => {
		getAsArray(childs).forEach((child) => {
			if (isString(child)) return;
			if (hasChildren(child)) getData(getChildren(child));
			else if (isObject(child) && !(0, import_react.isValidElement)(child)) Object.assign(values, child);
		});
	};
	getData(children);
	return values;
};
var nodesToString = (children, i18nOptions, i18n, i18nKey) => {
	if (!children) return "";
	let stringNode = "";
	const childrenArray = getAsArray(children);
	const keepArray = i18nOptions?.transSupportBasicHtmlNodes ? i18nOptions.transKeepBasicHtmlNodesFor ?? [] : [];
	childrenArray.forEach((child, childIndex) => {
		if (isString(child)) {
			stringNode += `${child}`;
			return;
		}
		if ((0, import_react.isValidElement)(child)) {
			const { props, type } = child;
			const childPropsCount = Object.keys(props).length;
			const shouldKeepChild = keepArray.indexOf(type) > -1;
			const childChildren = props.children;
			if (!childChildren && shouldKeepChild && !childPropsCount) {
				stringNode += `<${type}/>`;
				return;
			}
			if (!childChildren && (!shouldKeepChild || childPropsCount) || props.i18nIsDynamicList) {
				stringNode += `<${childIndex}></${childIndex}>`;
				return;
			}
			if (shouldKeepChild && childPropsCount <= 1) {
				const cnt = isString(childChildren) ? childChildren : nodesToString(childChildren, i18nOptions, i18n, i18nKey);
				stringNode += `<${type}>${cnt}</${type}>`;
				return;
			}
			const content = nodesToString(childChildren, i18nOptions, i18n, i18nKey);
			stringNode += `<${childIndex}>${content}</${childIndex}>`;
			return;
		}
		if (child === null) {
			warn(i18n, "TRANS_NULL_VALUE", `Passed in a null value as child`, { i18nKey });
			return;
		}
		if (isObject(child)) {
			const { format, ...clone } = child;
			const keys = Object.keys(clone);
			if (keys.length === 1) {
				const value = format ? `${keys[0]}, ${format}` : keys[0];
				stringNode += `{{${value}}}`;
				return;
			}
			warn(i18n, "TRANS_INVALID_OBJ", `Invalid child - Object should only have keys {{ value, format }} (format is optional).`, {
				i18nKey,
				child
			});
			return;
		}
		warn(i18n, "TRANS_INVALID_VAR", `Passed in a variable like {number} - pass variables for interpolation as full objects like {{number}}.`, {
			i18nKey,
			child
		});
	});
	return stringNode;
};
var escapeLiteralLessThan = (str, keepArray = [], knownComponentsMap = {}) => {
	if (!str) return str;
	const knownNames = Object.keys(knownComponentsMap);
	const allValidNames = [...keepArray, ...knownNames];
	let result = "";
	let i = 0;
	while (i < str.length) if (str[i] === "<") {
		let isValidTag = false;
		const closingMatch = str.slice(i).match(/^<\/(\d+|[a-zA-Z][a-zA-Z0-9_-]*)>/);
		if (closingMatch) {
			const tagName = closingMatch[1];
			if (/^\d+$/.test(tagName) || allValidNames.includes(tagName)) {
				isValidTag = true;
				result += closingMatch[0];
				i += closingMatch[0].length;
			}
		}
		if (!isValidTag) {
			const openingMatch = str.slice(i).match(/^<(\d+|[a-zA-Z][a-zA-Z0-9_-]*)(\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*(\/)?>/);
			if (openingMatch) {
				const tagName = openingMatch[1];
				if (/^\d+$/.test(tagName) || allValidNames.includes(tagName)) {
					isValidTag = true;
					result += openingMatch[0];
					i += openingMatch[0].length;
				}
			}
		}
		if (!isValidTag) {
			result += "&lt;";
			i += 1;
		}
	} else {
		result += str[i];
		i += 1;
	}
	return result;
};
var renderNodes = (children, knownComponentsMap, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) => {
	if (targetString === "") return [];
	const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
	const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map((keep) => `<${keep}`).join("|")).test(targetString);
	if (!children && !knownComponentsMap && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
	const data = knownComponentsMap ?? {};
	const getData = (childs) => {
		getAsArray(childs).forEach((child) => {
			if (isString(child)) return;
			if (hasChildren(child)) getData(getChildren(child));
			else if (isObject(child) && !(0, import_react.isValidElement)(child)) Object.assign(data, child);
		});
	};
	getData(children);
	const escapedString = escapeLiteralLessThan(targetString, keepArray, data);
	const ast = c.parse(`<0>${escapedString}</0>`);
	const opts = {
		...data,
		...combinedTOpts
	};
	const renderInner = (child, node, rootReactNode) => {
		const childs = getChildren(child);
		const mappedChildren = mapAST(childs, node.children, rootReactNode);
		return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props?.i18nIsDynamicList ? childs : mappedChildren;
	};
	const pushTranslatedJSX = (child, inner, mem, i, isVoid) => {
		if (child.dummy) {
			child.children = inner;
			mem.push((0, import_react.cloneElement)(child, { key: i }, isVoid ? void 0 : inner));
		} else mem.push(...import_react.Children.map([child], (c) => {
			if (c.type === import_react.Fragment || c.props?.i18nIsDynamicList !== void 0) {
				const freshProps = { key: i };
				if (c && c.props) Object.keys(c.props).forEach((k) => {
					if (k === "children" || k === "i18nIsDynamicList") return;
					freshProps[k] = c.props[k];
				});
				return (0, import_react.createElement)(c.type, freshProps, isVoid ? null : inner);
			}
			const override = { key: i };
			if (c && c.props) Object.keys(c.props).forEach((k) => {
				if (k === "ref" || k === "children") return;
				override[k] = c.props[k];
			});
			return (0, import_react.cloneElement)(c, override, isVoid ? null : inner);
		}));
	};
	const mapAST = (reactNode, astNode, rootReactNode) => {
		const reactNodes = getAsArray(reactNode);
		const astNodes = getAsArray(astNode);
		const keepTagOccurrence = {};
		return astNodes.reduce((mem, node, i) => {
			const translationContent = node.children?.[0]?.content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
			if (node.type === "tag") {
				let tmp = reactNodes[parseInt(node.name, 10)];
				if (!tmp && knownComponentsMap) tmp = knownComponentsMap[node.name];
				if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
				if (!tmp) tmp = {};
				const props = { ...node.attrs };
				if (shouldUnescape) Object.keys(props).forEach((p) => {
					const val = props[p];
					if (isString(val)) props[p] = unescape(val);
				});
				const child = Object.keys(props).length !== 0 ? mergeProps({ props }, tmp) : tmp;
				const isElement = (0, import_react.isValidElement)(child);
				const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
				const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && isObject(child) && child.dummy && !isElement;
				const isKnownComponent = isObject(knownComponentsMap) && Object.hasOwnProperty.call(knownComponentsMap, node.name);
				if (isString(child)) {
					const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
					mem.push(value);
				} else if (hasChildren(child) || isValidTranslationWithChildren) pushTranslatedJSX(child, renderInner(child, node, rootReactNode), mem, i);
				else if (isEmptyTransWithHTML) pushTranslatedJSX(child, mapAST(reactNodes, node.children, rootReactNode), mem, i);
				else if (Number.isNaN(parseFloat(node.name))) if (isKnownComponent) pushTranslatedJSX(child, renderInner(child, node, rootReactNode), mem, i, node.voidElement);
				else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) if (node.voidElement) mem.push((0, import_react.createElement)(node.name, { key: `${node.name}-${i}` }));
				else {
					const occurrence = keepTagOccurrence[node.name] || 0;
					keepTagOccurrence[node.name] = occurrence + 1;
					let matched;
					let seen = 0;
					for (let r = 0; r < reactNodes.length; r += 1) {
						const rn = reactNodes[r];
						if ((0, import_react.isValidElement)(rn) && rn.type === node.name) {
							if (seen === occurrence) {
								matched = rn;
								break;
							}
							seen += 1;
						}
					}
					const inner = mapAST(matched ? getAsArray(getChildren(matched)) : reactNodes, node.children, rootReactNode);
					mem.push((0, import_react.createElement)(node.name, { key: `${node.name}-${i}` }, inner));
				}
				else if (node.voidElement) mem.push(`<${node.name} />`);
				else {
					const inner = mapAST(reactNodes, node.children, rootReactNode);
					mem.push(`<${node.name}>${inner}</${node.name}>`);
				}
				else if (isObject(child) && !isElement) {
					const content = node.children[0] ? translationContent : null;
					if (content) mem.push(content);
				} else pushTranslatedJSX(child, translationContent, mem, i, node.children.length !== 1 || !translationContent);
			} else if (node.type === "text") {
				const wrapTextNodes = i18nOptions.transWrapTextNodes;
				const unescapeFn = typeof i18nOptions.unescape === "function" ? i18nOptions.unescape : getDefaults().unescape;
				const content = shouldUnescape ? unescapeFn(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
				if (wrapTextNodes) mem.push((0, import_react.createElement)(wrapTextNodes, { key: `${node.name}-${i}` }, content));
				else mem.push(content);
			}
			return mem;
		}, []);
	};
	return getChildren(mapAST([{
		dummy: true,
		children: children || []
	}], ast, getAsArray(children || []))[0]);
};
var fixComponentProps = (component, index, translation) => {
	const componentKey = component.key || index;
	const comp = (0, import_react.cloneElement)(component, { key: componentKey });
	if (!comp.props || !comp.props.children || translation.indexOf(`${index}/>`) < 0 && translation.indexOf(`${index} />`) < 0) return comp;
	function Componentized() {
		return (0, import_react.createElement)(import_react.Fragment, null, comp);
	}
	return (0, import_react.createElement)(Componentized, { key: componentKey });
};
var generateArrayComponents = (components, translation) => components.map((c, index) => fixComponentProps(c, index, translation));
var generateObjectComponents = (components, translation) => {
	const componentMap = {};
	Object.keys(components).forEach((c) => {
		Object.assign(componentMap, { [c]: fixComponentProps(components[c], c, translation) });
	});
	return componentMap;
};
var generateComponents = (components, translation, i18n, i18nKey) => {
	if (!components) return null;
	if (Array.isArray(components)) return generateArrayComponents(components, translation);
	if (isObject(components)) return generateObjectComponents(components, translation);
	warnOnce(i18n, "TRANS_INVALID_COMPONENTS", `<Trans /> "components" prop expects an object or array`, { i18nKey });
	return null;
};
var isComponentsMap = (object) => {
	if (!isObject(object)) return false;
	if (Array.isArray(object)) return false;
	return Object.keys(object).reduce((acc, key) => acc && Number.isNaN(Number.parseFloat(key)), true);
};
function Trans$1({ children, count, parent, i18nKey, context, tOptions = {}, values, defaults, components, ns, i18n: i18nFromProps, t: tFromProps, shouldUnescape, ...additionalProps }) {
	const i18n = i18nFromProps || getI18n();
	if (!i18n) {
		warnOnce(i18n, "NO_I18NEXT_INSTANCE", `Trans: You need to pass in an i18next instance using i18nextReactModule`, { i18nKey });
		return children;
	}
	const t = tFromProps || i18n.t.bind(i18n) || ((k) => k);
	const reactI18nextOptions = {
		...getDefaults(),
		...i18n.options?.react
	};
	let namespaces = ns || t.ns || i18n.options?.defaultNS;
	namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
	const { transDefaultProps } = reactI18nextOptions;
	const mergedTOptions = transDefaultProps?.tOptions ? {
		...transDefaultProps.tOptions,
		...tOptions
	} : tOptions;
	const mergedShouldUnescape = shouldUnescape ?? transDefaultProps?.shouldUnescape;
	const mergedValues = transDefaultProps?.values ? {
		...transDefaultProps.values,
		...values
	} : values;
	const mergedComponents = transDefaultProps?.components ? {
		...transDefaultProps.components,
		...components
	} : components;
	const nodeAsString = nodesToString(children, reactI18nextOptions, i18n, i18nKey);
	const defaultValue = defaults || mergedTOptions?.defaultValue || nodeAsString || reactI18nextOptions.transEmptyNodeValue || (typeof i18nKey === "function" ? keysFromSelector(i18nKey) : i18nKey);
	const { hashTransKey } = reactI18nextOptions;
	const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
	if (i18n.options?.interpolation?.defaultVariables) values = mergedValues && Object.keys(mergedValues).length > 0 ? {
		...mergedValues,
		...i18n.options.interpolation.defaultVariables
	} : { ...i18n.options.interpolation.defaultVariables };
	else values = mergedValues;
	const valuesFromChildren = getValuesFromChildren(children);
	if (valuesFromChildren && typeof valuesFromChildren.count === "number" && count === void 0) count = valuesFromChildren.count;
	const interpolationOverride = values || count !== void 0 && !i18n.options?.interpolation?.alwaysFormat || !children ? mergedTOptions.interpolation : { interpolation: {
		...mergedTOptions.interpolation,
		prefix: "#$?",
		suffix: "?$#"
	} };
	const combinedTOpts = {
		...mergedTOptions,
		context: context || mergedTOptions.context,
		count,
		...values,
		...interpolationOverride,
		defaultValue,
		ns: namespaces
	};
	let translation = key ? t(key, combinedTOpts) : defaultValue;
	if (translation === key && defaultValue) translation = defaultValue;
	const generatedComponents = generateComponents(mergedComponents, translation, i18n, i18nKey);
	let indexedChildren = generatedComponents || children;
	let componentsMap = null;
	if (isComponentsMap(generatedComponents)) {
		componentsMap = generatedComponents;
		indexedChildren = children;
	}
	const content = renderNodes(indexedChildren, componentsMap, translation, i18n, reactI18nextOptions, combinedTOpts, mergedShouldUnescape);
	const useAsParent = parent ?? reactI18nextOptions.defaultTransParent;
	return useAsParent ? (0, import_react.createElement)(useAsParent, additionalProps, content) : content;
}
//#endregion
//#region node_modules/react-i18next/dist/es/initReactI18next.js
var initReactI18next = {
	type: "3rdParty",
	init(instance) {
		setDefaults(instance.options.react);
		setI18n(instance);
	}
};
//#endregion
//#region node_modules/react-i18next/dist/es/context.js
var I18nContext = (0, import_react.createContext)();
var ReportNamespaces = class {
	constructor() {
		this.usedNamespaces = {};
	}
	addUsedNamespaces(namespaces) {
		namespaces.forEach((ns) => {
			if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
		});
	}
	getUsedNamespaces() {
		return Object.keys(this.usedNamespaces);
	}
};
var composeInitialProps = (ForComponent) => async (ctx) => {
	const componentsInitialProps = await ForComponent.getInitialProps?.(ctx) ?? {};
	const i18nInitialProps = getInitialProps();
	return {
		...componentsInitialProps,
		...i18nInitialProps
	};
};
var getInitialProps = () => {
	const i18n = getI18n();
	if (!i18n) {
		console.warn("react-i18next:: getInitialProps: You will need to pass in an i18next instance by using initReactI18next");
		return {};
	}
	const namespaces = i18n.reportNamespaces?.getUsedNamespaces() ?? [];
	const ret = {};
	const initialI18nStore = {};
	i18n.languages.forEach((l) => {
		initialI18nStore[l] = {};
		namespaces.forEach((ns) => {
			initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
		});
	});
	ret.initialI18nStore = initialI18nStore;
	ret.initialLanguage = i18n.language;
	return ret;
};
//#endregion
//#region node_modules/react-i18next/dist/es/Trans.js
function Trans({ children, count, parent, i18nKey, context, tOptions = {}, values, defaults, components, ns, i18n: i18nFromProps, t: tFromProps, shouldUnescape, ...additionalProps }) {
	const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	const t = tFromProps || i18n?.t.bind(i18n);
	return Trans$1({
		children,
		count,
		parent,
		i18nKey,
		context,
		tOptions,
		values,
		defaults,
		components,
		ns: ns || t?.ns || defaultNSFromContext || i18n?.options?.defaultNS,
		i18n,
		t: tFromProps,
		shouldUnescape,
		...additionalProps
	});
}
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTransUtils/TranslationParserError.js
var TranslationParserError = class TranslationParserError extends Error {
	constructor(message, position, translationString) {
		super(message);
		this.name = "TranslationParserError";
		this.position = position;
		this.translationString = translationString;
		if (Error.captureStackTrace) Error.captureStackTrace(this, TranslationParserError);
	}
};
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTransUtils/htmlEntityDecoder.js
var commonEntities = {
	"&nbsp;": "\xA0",
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&apos;": "'",
	"&copy;": "©",
	"&reg;": "®",
	"&trade;": "™",
	"&hellip;": "…",
	"&ndash;": "–",
	"&mdash;": "—",
	"&lsquo;": "‘",
	"&rsquo;": "’",
	"&sbquo;": "‚",
	"&ldquo;": "“",
	"&rdquo;": "”",
	"&bdquo;": "„",
	"&dagger;": "†",
	"&Dagger;": "‡",
	"&bull;": "•",
	"&prime;": "′",
	"&Prime;": "″",
	"&lsaquo;": "‹",
	"&rsaquo;": "›",
	"&sect;": "§",
	"&para;": "¶",
	"&middot;": "·",
	"&ensp;": " ",
	"&emsp;": " ",
	"&thinsp;": " ",
	"&euro;": "€",
	"&pound;": "£",
	"&yen;": "¥",
	"&cent;": "¢",
	"&curren;": "¤",
	"&times;": "×",
	"&divide;": "÷",
	"&minus;": "−",
	"&plusmn;": "±",
	"&ne;": "≠",
	"&le;": "≤",
	"&ge;": "≥",
	"&asymp;": "≈",
	"&equiv;": "≡",
	"&infin;": "∞",
	"&int;": "∫",
	"&sum;": "∑",
	"&prod;": "∏",
	"&radic;": "√",
	"&part;": "∂",
	"&permil;": "‰",
	"&deg;": "°",
	"&micro;": "µ",
	"&larr;": "←",
	"&uarr;": "↑",
	"&rarr;": "→",
	"&darr;": "↓",
	"&harr;": "↔",
	"&crarr;": "↵",
	"&lArr;": "⇐",
	"&uArr;": "⇑",
	"&rArr;": "⇒",
	"&dArr;": "⇓",
	"&hArr;": "⇔",
	"&alpha;": "α",
	"&beta;": "β",
	"&gamma;": "γ",
	"&delta;": "δ",
	"&epsilon;": "ε",
	"&zeta;": "ζ",
	"&eta;": "η",
	"&theta;": "θ",
	"&iota;": "ι",
	"&kappa;": "κ",
	"&lambda;": "λ",
	"&mu;": "μ",
	"&nu;": "ν",
	"&xi;": "ξ",
	"&omicron;": "ο",
	"&pi;": "π",
	"&rho;": "ρ",
	"&sigma;": "σ",
	"&tau;": "τ",
	"&upsilon;": "υ",
	"&phi;": "φ",
	"&chi;": "χ",
	"&psi;": "ψ",
	"&omega;": "ω",
	"&Alpha;": "Α",
	"&Beta;": "Β",
	"&Gamma;": "Γ",
	"&Delta;": "Δ",
	"&Epsilon;": "Ε",
	"&Zeta;": "Ζ",
	"&Eta;": "Η",
	"&Theta;": "Θ",
	"&Iota;": "Ι",
	"&Kappa;": "Κ",
	"&Lambda;": "Λ",
	"&Mu;": "Μ",
	"&Nu;": "Ν",
	"&Xi;": "Ξ",
	"&Omicron;": "Ο",
	"&Pi;": "Π",
	"&Rho;": "Ρ",
	"&Sigma;": "Σ",
	"&Tau;": "Τ",
	"&Upsilon;": "Υ",
	"&Phi;": "Φ",
	"&Chi;": "Χ",
	"&Psi;": "Ψ",
	"&Omega;": "Ω",
	"&Agrave;": "À",
	"&Aacute;": "Á",
	"&Acirc;": "Â",
	"&Atilde;": "Ã",
	"&Auml;": "Ä",
	"&Aring;": "Å",
	"&AElig;": "Æ",
	"&Ccedil;": "Ç",
	"&Egrave;": "È",
	"&Eacute;": "É",
	"&Ecirc;": "Ê",
	"&Euml;": "Ë",
	"&Igrave;": "Ì",
	"&Iacute;": "Í",
	"&Icirc;": "Î",
	"&Iuml;": "Ï",
	"&ETH;": "Ð",
	"&Ntilde;": "Ñ",
	"&Ograve;": "Ò",
	"&Oacute;": "Ó",
	"&Ocirc;": "Ô",
	"&Otilde;": "Õ",
	"&Ouml;": "Ö",
	"&Oslash;": "Ø",
	"&Ugrave;": "Ù",
	"&Uacute;": "Ú",
	"&Ucirc;": "Û",
	"&Uuml;": "Ü",
	"&Yacute;": "Ý",
	"&THORN;": "Þ",
	"&szlig;": "ß",
	"&agrave;": "à",
	"&aacute;": "á",
	"&acirc;": "â",
	"&atilde;": "ã",
	"&auml;": "ä",
	"&aring;": "å",
	"&aelig;": "æ",
	"&ccedil;": "ç",
	"&egrave;": "è",
	"&eacute;": "é",
	"&ecirc;": "ê",
	"&euml;": "ë",
	"&igrave;": "ì",
	"&iacute;": "í",
	"&icirc;": "î",
	"&iuml;": "ï",
	"&eth;": "ð",
	"&ntilde;": "ñ",
	"&ograve;": "ò",
	"&oacute;": "ó",
	"&ocirc;": "ô",
	"&otilde;": "õ",
	"&ouml;": "ö",
	"&oslash;": "ø",
	"&ugrave;": "ù",
	"&uacute;": "ú",
	"&ucirc;": "û",
	"&uuml;": "ü",
	"&yacute;": "ý",
	"&thorn;": "þ",
	"&yuml;": "ÿ",
	"&iexcl;": "¡",
	"&iquest;": "¿",
	"&fnof;": "ƒ",
	"&circ;": "ˆ",
	"&tilde;": "˜",
	"&OElig;": "Œ",
	"&oelig;": "œ",
	"&Scaron;": "Š",
	"&scaron;": "š",
	"&Yuml;": "Ÿ",
	"&ordf;": "ª",
	"&ordm;": "º",
	"&macr;": "¯",
	"&acute;": "´",
	"&cedil;": "¸",
	"&sup1;": "¹",
	"&sup2;": "²",
	"&sup3;": "³",
	"&frac14;": "¼",
	"&frac12;": "½",
	"&frac34;": "¾",
	"&spades;": "♠",
	"&clubs;": "♣",
	"&hearts;": "♥",
	"&diams;": "♦",
	"&loz;": "◊",
	"&oline;": "‾",
	"&frasl;": "⁄",
	"&weierp;": "℘",
	"&image;": "ℑ",
	"&real;": "ℜ",
	"&alefsym;": "ℵ"
};
var entityPattern = new RegExp(Object.keys(commonEntities).map((entity) => entity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
var decodeHtmlEntities = (text) => text.replace(entityPattern, (match) => commonEntities[match]).replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10))).replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTransUtils/tokenizer.js
var tokenize = (translation) => {
	const tokens = [];
	let position = 0;
	let currentText = "";
	const flushText = () => {
		if (currentText) {
			tokens.push({
				type: "Text",
				value: currentText,
				position: position - currentText.length
			});
			currentText = "";
		}
	};
	while (position < translation.length) {
		const char = translation[position];
		if (char === "<") {
			const tagMatch = translation.slice(position).match(/^<(\d+)>/);
			if (tagMatch) {
				flushText();
				tokens.push({
					type: "TagOpen",
					value: tagMatch[0],
					position,
					tagNumber: parseInt(tagMatch[1], 10)
				});
				position += tagMatch[0].length;
			} else {
				const closeTagMatch = translation.slice(position).match(/^<\/(\d+)>/);
				if (closeTagMatch) {
					flushText();
					tokens.push({
						type: "TagClose",
						value: closeTagMatch[0],
						position,
						tagNumber: parseInt(closeTagMatch[1], 10)
					});
					position += closeTagMatch[0].length;
				} else {
					currentText += char;
					position += 1;
				}
			}
		} else {
			currentText += char;
			position += 1;
		}
	}
	flushText();
	return tokens;
};
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTransUtils/renderTranslation.js
var renderDeclarationNode = (declaration, children, childDeclarations) => {
	const { type, props = {} } = declaration;
	if (props.children && Array.isArray(props.children) && childDeclarations) {
		const { children: _childrenToRemove, ...propsWithoutChildren } = props;
		return import_react.createElement(type, propsWithoutChildren, ...children);
	}
	if (children.length === 0) return import_react.createElement(type, props);
	if (children.length === 1) return import_react.createElement(type, props, children[0]);
	return import_react.createElement(type, props, ...children);
};
var renderTranslation = (translation, declarations = []) => {
	if (!translation) return [];
	const tokens = tokenize(translation);
	const result = [];
	const stack = [];
	const literalTagNumbers = /* @__PURE__ */ new Set();
	const getCurrentDeclarations = () => {
		if (stack.length === 0) return declarations;
		const parentFrame = stack[stack.length - 1];
		if (parentFrame.declaration.props?.children && Array.isArray(parentFrame.declaration.props.children)) return parentFrame.declaration.props.children;
		return parentFrame.declarations;
	};
	tokens.forEach((token) => {
		switch (token.type) {
			case "Text":
				{
					const decoded = decodeHtmlEntities(token.value);
					(stack.length > 0 ? stack[stack.length - 1].children : result).push(decoded);
				}
				break;
			case "TagOpen":
				{
					const { tagNumber } = token;
					const currentDeclarations = getCurrentDeclarations();
					const declaration = currentDeclarations[tagNumber];
					if (!declaration) {
						literalTagNumbers.add(tagNumber);
						const literalText = `<${tagNumber}>`;
						(stack.length > 0 ? stack[stack.length - 1].children : result).push(literalText);
						break;
					}
					stack.push({
						tagNumber,
						children: [],
						position: token.position,
						declaration,
						declarations: currentDeclarations
					});
				}
				break;
			case "TagClose":
				{
					const { tagNumber } = token;
					if (literalTagNumbers.has(tagNumber)) {
						const literalText = `</${tagNumber}>`;
						(stack.length > 0 ? stack[stack.length - 1].children : result).push(literalText);
						literalTagNumbers.delete(tagNumber);
						break;
					}
					if (stack.length === 0) throw new TranslationParserError(`Unexpected closing tag </${tagNumber}> at position ${token.position}`, token.position, translation);
					const frame = stack.pop();
					if (frame.tagNumber !== tagNumber) throw new TranslationParserError(`Mismatched tags: expected </${frame.tagNumber}> but got </${tagNumber}> at position ${token.position}`, token.position, translation);
					const element = renderDeclarationNode(frame.declaration, frame.children, frame.declarations);
					(stack.length > 0 ? stack[stack.length - 1].children : result).push(element);
				}
				break;
		}
	});
	if (stack.length > 0) {
		const unclosed = stack[stack.length - 1];
		throw new TranslationParserError(`Unclosed tag <${unclosed.tagNumber}> at position ${unclosed.position}`, unclosed.position, translation);
	}
	return result;
};
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTransWithoutContext.js
function IcuTransWithoutContext({ i18nKey, defaultTranslation, content, ns, values = {}, i18n: i18nFromProps, t: tFromProps }) {
	const i18n = i18nFromProps || getI18n();
	if (!i18n) {
		warnOnce(i18n, "NO_I18NEXT_INSTANCE", `IcuTrans: You need to pass in an i18next instance using i18nextReactModule`, { i18nKey });
		return import_react.createElement(import_react.Fragment, {}, defaultTranslation);
	}
	const t = tFromProps || i18n.t?.bind(i18n) || ((k) => k);
	let namespaces = ns || t.ns || i18n.options?.defaultNS;
	namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
	let mergedValues = values;
	if (i18n.options?.interpolation?.defaultVariables) mergedValues = values && Object.keys(values).length > 0 ? {
		...values,
		...i18n.options.interpolation.defaultVariables
	} : { ...i18n.options.interpolation.defaultVariables };
	const translation = t(i18nKey, {
		defaultValue: defaultTranslation,
		...mergedValues,
		ns: namespaces
	});
	try {
		const rendered = renderTranslation(translation, content);
		return import_react.createElement(import_react.Fragment, {}, ...rendered);
	} catch (error) {
		warn(i18n, "ICU_TRANS_RENDER_ERROR", `IcuTrans component error for key "${i18nKey}": ${error.message}`, {
			i18nKey,
			error
		});
		return import_react.createElement(import_react.Fragment, {}, translation);
	}
}
IcuTransWithoutContext.displayName = "IcuTransWithoutContext";
//#endregion
//#region node_modules/react-i18next/dist/es/IcuTrans.js
function IcuTrans({ i18nKey, defaultTranslation, content, ns, values = {}, i18n: i18nFromProps, t: tFromProps }) {
	const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	const t = tFromProps || i18n?.t.bind(i18n);
	return IcuTransWithoutContext({
		i18nKey,
		defaultTranslation,
		content,
		ns: ns || t?.ns || defaultNSFromContext || i18n?.options?.defaultNS,
		values,
		i18n,
		t: tFromProps
	});
}
IcuTrans.displayName = "IcuTrans";
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
/**
* @license React
* use-sync-external-store-shim.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		function useSyncExternalStore$2(subscribe, getSnapshot) {
			didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var value = getSnapshot();
			if (!didWarnUncachedGetSnapshot) {
				var cachedValue = getSnapshot();
				objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
			}
			cachedValue = useState({ inst: {
				value,
				getSnapshot
			} });
			var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
			useLayoutEffect(function() {
				inst.value = value;
				inst.getSnapshot = getSnapshot;
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			}, [
				subscribe,
				value,
				getSnapshot
			]);
			useEffect(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				return subscribe(function() {
					checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				});
			}, [subscribe]);
			useDebugValue(value);
			return value;
		}
		function checkIfSnapshotChanged(inst) {
			var latestGetSnapshot = inst.getSnapshot;
			inst = inst.value;
			try {
				var nextValue = latestGetSnapshot();
				return !objectIs(inst, nextValue);
			} catch (error) {
				return !0;
			}
		}
		function useSyncExternalStore$1(subscribe, getSnapshot) {
			return getSnapshot();
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
		exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region node_modules/react-i18next/dist/es/useTranslation.js
var import_shim = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_development();
})))();
var notReadyT = (k, optsOrDefaultValue) => {
	if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
	if (isObject(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
	if (typeof k === "function") return "";
	if (Array.isArray(k)) {
		const last = k[k.length - 1];
		return typeof last === "function" ? "" : last;
	}
	return k;
};
var notReadySnapshot = {
	t: notReadyT,
	ready: false
};
var dummySubscribe = () => () => {};
var useTranslation = (ns, props = {}) => {
	const { i18n: i18nFromProps } = props;
	const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
	if (!i18n) warnOnce(i18n, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
	const i18nOptions = (0, import_react.useMemo)(() => ({
		...getDefaults(),
		...i18n?.options?.react,
		...props
	}), [i18n, props]);
	const { useSuspense, keyPrefix } = i18nOptions;
	const nsOrContext = ns || defaultNSFromContext || i18n?.options?.defaultNS;
	const unstableNamespaces = isString(nsOrContext) ? [nsOrContext] : nsOrContext || ["translation"];
	const namespaces = (0, import_react.useMemo)(() => unstableNamespaces, unstableNamespaces);
	i18n?.reportNamespaces?.addUsedNamespaces?.(namespaces);
	const revisionRef = (0, import_react.useRef)(0);
	const subscribe = (0, import_react.useCallback)((callback) => {
		if (!i18n) return dummySubscribe;
		const { bindI18n, bindI18nStore } = i18nOptions;
		const wrappedCallback = () => {
			revisionRef.current += 1;
			callback();
		};
		if (bindI18n) i18n.on(bindI18n, wrappedCallback);
		if (bindI18nStore) i18n.store.on(bindI18nStore, wrappedCallback);
		return () => {
			if (bindI18n) bindI18n.split(" ").forEach((e) => i18n.off(e, wrappedCallback));
			if (bindI18nStore) bindI18nStore.split(" ").forEach((e) => i18n.store.off(e, wrappedCallback));
		};
	}, [i18n, i18nOptions]);
	const snapshotRef = (0, import_react.useRef)();
	const getSnapshot = (0, import_react.useCallback)(() => {
		if (!i18n) return notReadySnapshot;
		const calculatedReady = !!(i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
		const currentLng = props.lng || i18n.language;
		const currentRevision = revisionRef.current;
		const lastSnapshot = snapshotRef.current;
		if (lastSnapshot && lastSnapshot.ready === calculatedReady && lastSnapshot.lng === currentLng && lastSnapshot.keyPrefix === keyPrefix && lastSnapshot.revision === currentRevision) return lastSnapshot;
		const newSnapshot = {
			t: i18n.getFixedT(currentLng, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix, { scopeNs: namespaces }),
			ready: calculatedReady,
			lng: currentLng,
			keyPrefix,
			revision: currentRevision
		};
		snapshotRef.current = newSnapshot;
		return newSnapshot;
	}, [
		i18n,
		namespaces,
		keyPrefix,
		i18nOptions,
		props.lng
	]);
	const [loadCount, setLoadCount] = (0, import_react.useState)(0);
	const { t, ready } = (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
	(0, import_react.useEffect)(() => {
		if (i18n && !ready && !useSuspense) {
			const onLoaded = () => setLoadCount((c) => c + 1);
			if (props.lng) loadLanguages(i18n, props.lng, namespaces, onLoaded);
			else loadNamespaces(i18n, namespaces, onLoaded);
		}
	}, [
		i18n,
		props.lng,
		namespaces,
		ready,
		useSuspense,
		loadCount
	]);
	const finalI18n = i18n || {};
	const wrapperRef = (0, import_react.useRef)(null);
	const wrapperLangRef = (0, import_react.useRef)();
	const createI18nWrapper = (original) => {
		const descriptors = Object.getOwnPropertyDescriptors(original);
		if (descriptors.__original) delete descriptors.__original;
		const wrapper = Object.create(Object.getPrototypeOf(original), descriptors);
		if (!Object.prototype.hasOwnProperty.call(wrapper, "__original")) try {
			Object.defineProperty(wrapper, "__original", {
				value: original,
				writable: false,
				enumerable: false,
				configurable: false
			});
		} catch (_) {}
		return wrapper;
	};
	const ret = (0, import_react.useMemo)(() => {
		const original = finalI18n;
		const lang = original?.language;
		let i18nWrapper = original;
		if (original) if (wrapperRef.current && wrapperRef.current.__original === original) if (wrapperLangRef.current !== lang) {
			i18nWrapper = createI18nWrapper(original);
			wrapperRef.current = i18nWrapper;
			wrapperLangRef.current = lang;
		} else i18nWrapper = wrapperRef.current;
		else {
			i18nWrapper = createI18nWrapper(original);
			wrapperRef.current = i18nWrapper;
			wrapperLangRef.current = lang;
		}
		const effectiveT = !ready && !useSuspense ? (...args) => {
			warnOnce(i18n, "USE_T_BEFORE_READY", "useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t.");
			return t(...args);
		} : t;
		const arr = [
			effectiveT,
			i18nWrapper,
			ready
		];
		arr.t = effectiveT;
		arr.i18n = i18nWrapper;
		arr.ready = ready;
		return arr;
	}, [
		t,
		finalI18n,
		ready,
		finalI18n.resolvedLanguage,
		finalI18n.language,
		finalI18n.languages
	]);
	if (i18n && useSuspense && !ready) throw new Promise((resolve) => {
		const onLoaded = () => resolve();
		if (props.lng) loadLanguages(i18n, props.lng, namespaces, onLoaded);
		else loadNamespaces(i18n, namespaces, onLoaded);
	});
	return ret;
};
//#endregion
//#region node_modules/react-i18next/dist/es/withTranslation.js
var withTranslation = (ns, options = {}) => function Extend(WrappedComponent) {
	function I18nextWithTranslation({ forwardedRef, ...rest }) {
		const [t, i18n, ready] = useTranslation(ns, {
			...rest,
			keyPrefix: options.keyPrefix
		});
		const passDownProps = {
			...rest,
			t,
			i18n,
			tReady: ready
		};
		if (options.withRef && forwardedRef) passDownProps.ref = forwardedRef;
		else if (!options.withRef && forwardedRef) passDownProps.forwardedRef = forwardedRef;
		return (0, import_react.createElement)(WrappedComponent, passDownProps);
	}
	I18nextWithTranslation.displayName = `withI18nextTranslation(${getDisplayName(WrappedComponent)})`;
	I18nextWithTranslation.WrappedComponent = WrappedComponent;
	const forwardRef = (props, ref) => (0, import_react.createElement)(I18nextWithTranslation, Object.assign({}, props, { forwardedRef: ref }));
	return options.withRef ? (0, import_react.forwardRef)(forwardRef) : I18nextWithTranslation;
};
//#endregion
//#region node_modules/react-i18next/dist/es/Translation.js
var Translation = ({ ns, children, ...options }) => {
	const [t, i18n, ready] = useTranslation(ns, options);
	return children(t, {
		i18n,
		lng: i18n?.language
	}, ready);
};
//#endregion
//#region node_modules/react-i18next/dist/es/I18nextProvider.js
function I18nextProvider({ i18n, defaultNS, children }) {
	const value = (0, import_react.useMemo)(() => ({
		i18n,
		defaultNS
	}), [i18n, defaultNS]);
	return (0, import_react.createElement)(I18nContext.Provider, { value }, children);
}
//#endregion
//#region node_modules/react-i18next/dist/es/useSSR.js
var useSSR = (initialI18nStore, initialLanguage, props = {}) => {
	const { i18n: i18nFromProps } = props;
	const { i18n: i18nFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	if (!i18n) {
		warnOnce(i18n, "NO_I18NEXT_INSTANCE", "useSSR: You will need to pass in an i18next instance by using initReactI18next or by passing it via props or context. In monorepo setups, make sure there is only one instance of react-i18next.");
		return;
	}
	if (i18n.options?.isClone) return;
	if (initialI18nStore && !i18n.initializedStoreOnce) {
		if (!i18n.services?.resourceStore) {
			warnOnce(i18n, "I18N_NOT_INITIALIZED", "useSSR: i18n instance was found but not initialized (services.resourceStore is missing). Make sure you call i18next.init() before using useSSR — e.g. at module level, not only in getStaticProps/getServerSideProps.");
			return;
		}
		i18n.services.resourceStore.data = initialI18nStore;
		i18n.options.ns = Object.values(initialI18nStore).reduce((mem, lngResources) => {
			Object.keys(lngResources).forEach((ns) => {
				if (mem.indexOf(ns) < 0) mem.push(ns);
			});
			return mem;
		}, i18n.options.ns);
		i18n.initializedStoreOnce = true;
		i18n.isInitialized = true;
	}
	if (initialLanguage && !i18n.initializedLanguageOnce) {
		i18n.changeLanguage(initialLanguage);
		i18n.initializedLanguageOnce = true;
	}
};
//#endregion
//#region node_modules/react-i18next/dist/es/withSSR.js
var withSSR = () => function Extend(WrappedComponent) {
	function I18nextWithSSR({ initialI18nStore, initialLanguage, ...rest }) {
		useSSR(initialI18nStore, initialLanguage);
		return (0, import_react.createElement)(WrappedComponent, { ...rest });
	}
	I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
	I18nextWithSSR.displayName = `withI18nextSSR(${getDisplayName(WrappedComponent)})`;
	I18nextWithSSR.WrappedComponent = WrappedComponent;
	return I18nextWithSSR;
};
//#endregion
//#region node_modules/react-i18next/dist/es/index.js
var date = () => "";
var time = () => "";
var number = () => "";
var select = () => "";
var plural = () => "";
var selectOrdinal = () => "";
//#endregion
export { I18nContext, I18nextProvider, IcuTrans, IcuTransWithoutContext, Trans, Trans$1 as TransWithoutContext, Translation, composeInitialProps, date, getDefaults, getI18n, getInitialProps, initReactI18next, nodesToString, number, plural, select, selectOrdinal, setDefaults, setI18n, time, useSSR, useTranslation, withSSR, withTranslation };

//# sourceMappingURL=react-i18next.js.map