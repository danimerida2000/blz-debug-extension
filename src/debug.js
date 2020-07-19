if (typeof Blz === "object") {
    let showContextContainer = false;
    let monitorContainer = document.querySelector("#blz-context-monitor");
    if (!monitorContainer) {
        monitorContainer = document.createElement("section");
        monitorContainer.id = "blz-context-monitor";
        Object.assign(monitorContainer.style, {
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            position: "fixed",
            bottom: "30px",
            right: "30px",
            cursor: "pointer",
            boxShadow: "0px 2px 5px #666",
            background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M12,3.19l7,3.11V11c0,4.52-2.98,8.69-7,9.93C7.98,19.69,5,15.52,5,11V6.3L12,3.19 M12,1L3,5v6c0,5.55,3.84,10.74,9,12 c5.16-1.26,9-6.45,9-12V5L12,1L12,1z M11,7h2v2h-2V7z M11,11h2v6h-2V11z\"/></g></svg>')",
            backgroundColor: "#ec1d1d"
        });
        document.body.append(monitorContainer);
    }
    monitorContainer.addEventListener("click", () => {
        showContextContainer = !showContextContainer;
        let onScreenComponentName = (container, displayedOnScreen) => {
            if (container) {
                if (displayedOnScreen) {
                    let component = container.querySelector("[data-cmp]");
                    if (component && component.dataset) {
                        let titleContainer = document.getElementById(`blz-monitor-cmp-${component.dataset.cmp}`);
                        if (!titleContainer) {
                            titleContainer = document.createElement("span");
                            component.prepend(titleContainer);
                        }
                        component.style.border = `2px dotted ${'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}`;
                        titleContainer.id = `blz-monitor-cmp-${component.dataset.cmp}`;
                        titleContainer.innerHTML = component.dataset.cmp;
                        Object.assign(titleContainer.style, {
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold"
                        });
                    }
                    if (!component || (component && component.dataset && component.parentElement)) {
                        onScreenComponentName(container.parentElement, true);
                    }
                } else {
                    document.querySelectorAll("[id*='blz-monitor-cmp']").forEach(el => {
                        el.parentElement.style.border = "none";
                        el.remove();
                    });
                }
            }
        }
        let syntaxHighlight = json => {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                let color = '#ee422e';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        color = '#1A1A1A';
                    } else {
                        color = '#006000';
                    }
                } else if (/true|false/.test(match)) {
                    color = '#ff8c00';
                } else if (/null/.test(match)) {
                    color = '#004ed0';
                }
                return '<span style="color:' + color + ';">' + match + '</span>';
            });
        }
        if (showContextContainer) {
            monitorContainer.style.backgroundColor = "#66bb6a";
            document.addEventListener("mouseover", (event) => {
                let getIdRecursively = container => {
                    if (container && showContextContainer) {
                        let component, context, monitorContext, titleContextContainer;
                        if (container.id) {
                            component = Blz.ComponentManager.getComponent(container.id);
                            if (component) {
                                if (component.data && Object.keys(component.data).length > 0) {
                                    context = component.data;
                                } else if (component.model && Object.keys(component.model).length > 0) {
                                    context = component.model;
                                    if (typeof component.model.getObj === "function") {
                                        context = component.model.getObj();
                                    }
                                } else if (typeof component.getSelected === "function") {
                                    context = component.getSelected();
                                }
                                if (context && context.data && Object.keys(context).length > 0) {
                                    context = context.data;
                                }
                                if (context) {
                                    onScreenComponentName(container, true);
                                    monitorContext = document.querySelector("#blz-monitor-context");
                                    if (!monitorContext) {
                                        monitorContext = document.createElement("pre");
                                        monitorContext.id = "blz-monitor-context";
                                        Object.assign(monitorContext.style, {
                                            display: "flex",
                                            flexFlow: "column",
                                            minWidth: "250px",
                                            maxWidth: "500px",
                                            maxHeight: "400px",
                                            position: "absolute",
                                            bottom: "70px",
                                            right: "3px",
                                            boxShadow: "0px 0px 10px #00000094",
                                            wordBreak: "break-all",
                                            backgroundColor: "#fcfcfc",
                                            borderRadius: "10px",
                                            padding: "10px",
                                            border: "1px dotted #404040",
                                            resize: "both"
                                        });
                                        document.body.append(monitorContext);
                                    }
                                    monitorContext.querySelectorAll("code").forEach(el => {
                                        el.remove()
                                    });
                                    code = document.createElement("code");
                                    Object.assign(code.style, {
                                        fontSize: "10pt",
                                        overflow: "auto",
                                        height: "90%",
                                        margin: "0px 8px 10px 0px"
                                    });
                                    code.innerHTML = syntaxHighlight(JSON.stringify(context, null, 4));
                                    monitorContext.append(code);
                                    titleContextContainer = monitorContext.querySelector("a");
                                    if (!titleContextContainer) {
                                        titleContextContainer = document.createElement("a");
                                        titleContextContainer.innerHTML = "Drag and Drop";
                                        monitorContext.prepend(titleContextContainer);
                                    }
                                    Object.assign(titleContextContainer.style, {
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "10%",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        borderBottom: "1px solid #757575",
                                        margin: "0px 8px 0px 0px",
                                        cursor: "move",
                                        userSelect: "none"
                                    });
                                    if (code.offsetWidth > window.innerWidth) {
                                        monitorContext.style.width = window.innerWidth + 'px';
                                    }
                                    titleContextContainer.onmousedown = function (ev) {
                                        let shiftX = ev.clientX - monitorContext.getBoundingClientRect().left;
                                        let shiftY = ev.clientY - monitorContext.getBoundingClientRect().top;
                                        let moveAt = (pageX, pageY) => {
                                            if (showContextContainer); {
                                                monitorContext.style.left = pageX - shiftX + 'px';
                                                monitorContext.style.top = pageY - shiftY + 'px';
                                            }
                                        }
                                        let onMouseMove = (ev) => {
                                            if (showContextContainer) {
                                                moveAt(ev.pageX, ev.pageY);
                                            }
                                        }
                                        Object.assign(monitorContext.style, {
                                            maxHeight: "400px",
                                            position: "absolute",
                                            zIndex: "9000"
                                        });
                                        document.body.append(monitorContext);
                                        moveAt(ev.pageX, ev.pageY);
                                        document.addEventListener('mousemove', onMouseMove);
                                        document.addEventListener("mouseup", (e) => {
                                            document.removeEventListener('mousemove', onMouseMove);
                                            document.onmouseup = null;
                                        });
                                    };
                                    titleContextContainer.ondragstart = function () {
                                        return false;
                                    };
                                }
                            }
                        }
                        if (!container.id || !component) {
                            getIdRecursively(container.parentElement);
                        }
                    }
                }
                getIdRecursively(event.target);
            });
        } else {
            monitorContainer.style.backgroundColor = "#ec1d1d";
            onScreenComponentName(this, false);
            document.querySelectorAll("#blz-monitor-context").forEach(el => {
                el.remove();
            });
        }
        document.onkeydown = function (e) {
            e = e || window.event;
            let isEscape = false;
            if ("key" in e) {
                isEscape = (e.key === "Escape" || e.key === "Esc");
            } else {
                isEscape = (e.keyCode === 27);
            }
            if (isEscape) {
                showContextContainer = false;
                monitorContainer.style.backgroundColor = "#ec1d1d";
                onScreenComponentName(this, false);
                document.querySelectorAll("#blz-monitor-context").forEach(el => {
                    el.remove();
                });
            }
        };
    });
}