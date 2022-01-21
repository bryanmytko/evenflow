class ObjectService {
  insertChildNode = (data, _id, childNode) => {
    const iter = a => {
      if (a._id === _id) {
        if(a.children && a.children.length){
          a.children.push(childNode);
          return a;
        } else {
          return { ...a, children: [childNode] };
        }
      }
      return (a.children && a.children.length) ?
             { ...a, children: a.children.map(iter) } :
             a;
    };

    return iter(data);
  }

  replaceChildNode = (data, _id, childNode) => {
    const iter = a => {
      if (a._id === _id) return { ...a, ...childNode };
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return iter(data);
  }

  removeChildNode = (data, _id) => {
    const iter = a => {
      if (a.children.length && a.children.some(c => c._id === _id)){
        return { ...a, children: a.children.filter(c => c._id !== _id) }
      }
      return (a.children.length) ? { ...a, children: a.children.map(iter) } : a;
    };

    return iter(data);
  }
}

export default new ObjectService();
