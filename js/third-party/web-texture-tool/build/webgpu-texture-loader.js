var L={"image/jpeg":"rgb8unorm","image/png":"rgba8unorm","image/apng":"rgba8unorm","image/gif":"rgba8unorm","image/bmp":"rgb8unorm","image/webp":"rgba8unorm","image/x-icon":"rgba8unorm","image/svg+xml":"rgba8unorm"},G=typeof createImageBitmap!="undefined",v=class{constructor(){}static supportedMIMETypes(){return Object.keys(L)}async fromUrl(e,t,r){let o=L[r.mimeType];if(e.supportedFormatList.indexOf(o)==-1&&(o="rgba8unorm"),G){let s=await fetch(t),i=await createImageBitmap(await s.blob());return e.fromImageBitmap(i,o,r)}else return new Promise((s,i)=>{let n=new Image;n.addEventListener("load",()=>{s(e.textureFromImageElement(n,o,r))}),n.addEventListener("error",function(l){i(l)}),n.src=t})}async fromBlob(e,t,r){let o=L[t.type];if(e.supportedFormatList.indexOf(o)==-1&&(o="rgba8unorm"),G){let s=await createImageBitmap(t);return e.fromImageBitmap(s,o,r)}else return new Promise((s,i)=>{let n=new Image;n.addEventListener("load",()=>{s(e.fromImageElement(n,o,r))}),n.addEventListener("error",function(c){i(c)});let l=window.URL.createObjectURL(t);n.src=l})}async fromBuffer(e,t,r){let o=new Blob(t,{type:r.mimeType});return this.fromBlob(e,o,r)}destroy(){}};var H=import.meta.url.replace(/[^\/]*$/,""),k=class{constructor(e,t,r,o){this.client=e,this.options=t,this.resolve=r,this.reject=o}},h={},C=1;function V(a){let e=h[a.data.id];if(!e){a.data.error&&console.error(`Texture load failed: ${a.data.error}`),console.error(`Invalid pending texture ID: ${a.data.id}`);return}if(delete h[a.data.id],a.data.error){console.error(`Texture load failed: ${a.data.error}`),e.reject(`${a.data.error}`);return}let t=e.client.fromTextureData(a.data,e.options);e.resolve(t)}var p=class{constructor(e){let t=`${H}${e}`;this.worker=new Worker(t),this.worker.onmessage=V}async fromUrl(e,t,r){let o=C++;return this.worker.postMessage({id:o,url:t,supportedFormats:e.supportedFormats(),mipmaps:r.mipmaps,extension:r.extension}),new Promise((s,i)=>{h[o]=new k(e,r,s,i)})}async fromBlob(e,t,r){let o=await t.arrayBuffer();return this.fromBuffer(e,o,r)}async fromBuffer(e,t,r){let o=C++;return this.worker.postMessage({id:o,buffer:t,supportedFormats:e.supportedFormats(),mipmaps:r.mipmaps,extension:r.extension}),new Promise((s,i)=>{h[o]=new k(e,r,s,i)})}destroy(){if(this.worker){this.worker.terminate();let e=new Error("Texture loader was destroyed.");for(let t of h)t.reject(e)}}};var g=WebGLRenderingContext,b={rgb8unorm:{canGenerateMipmaps:!0,gl:{format:g.RGB,type:g.UNSIGNED_BYTE,sizedFormat:32849}},rgba8unorm:{canGenerateMipmaps:!0,gl:{format:g.RGBA,type:g.UNSIGNED_BYTE,sizedFormat:32856}},"rgb8unorm-srgb":{canGenerateMipmaps:!0,gl:{format:g.RGBA,type:g.UNSIGNED_BYTE,sizedFormat:35907}},"rgba8unorm-srgb":{canGenerateMipmaps:!0,gl:{format:g.RGBA,type:g.UNSIGNED_BYTE,sizedFormat:35907}},rgb565unorm:{canGenerateMipmaps:!0,gl:{format:g.RGB,type:g.UNSIGNED_SHORT_5_6_5,sizedFormat:g.RGB565}},rgba4unorm:{canGenerateMipmaps:!0,gl:{format:g.RGBA,type:g.UNSIGNED_SHORT_4_4_4_4,sizedFormat:g.RGBA4}},rgba5551unorm:{canGenerateMipmaps:!0,gl:{format:g.RGBA,type:g.UNSIGNED_SHORT_5_5_5_1,sizedFormat:g.RGB5_A1}},bgra8unorm:{canGenerateMipmaps:!0},"bgra8unorm-srgb":{canGenerateMipmaps:!0},"bc1-rgb-unorm":{gl:{texStorage:!0,sizedFormat:33776},compressed:{blockBytes:8,blockWidth:4,blockHeight:4}},"bc2-rgba-unorm":{gl:{texStorage:!0,sizedFormat:33778},compressed:{blockBytes:16,blockWidth:4,blockHeight:4}},"bc3-rgba-unorm":{gl:{texStorage:!1,sizedFormat:33779},compressed:{blockBytes:16,blockWidth:4,blockHeight:4}},"bc7-rgba-unorm":{gl:{texStorage:!0,sizedFormat:36492},compressed:{blockBytes:16,blockWidth:4,blockHeight:4}},"etc1-rgb-unorm":{gl:{texStorage:!1,sizedFormat:36196},compressed:{blockBytes:8,blockWidth:4,blockHeight:4}},"etc2-rgba8unorm":{gl:{texStorage:!0,sizedFormat:37496},compressed:{blockBytes:16,blockWidth:4,blockHeight:4}},"astc-4x4-rgba-unorm":{gl:{texStorage:!0,sizedFormat:37808},compressed:{blockBytes:16,blockWidth:4,blockHeight:4}},"pvrtc1-4bpp-rgb-unorm":{gl:{texStorage:!1,sizedFormat:35840},compressed:{blockBytes:8,blockWidth:4,blockHeight:4}},"pvrtc1-4bpp-rgba-unorm":{gl:{texStorage:!1,sizedFormat:35842},compressed:{blockBytes:8,blockWidth:4,blockHeight:4}}};var T=class{constructor(e,t={}){this.texture=e,this.width=t.width||1,this.height=t.height||1,this.depth=t.depth||1,this.mipLevels=t.mipLevels||1,this.format=t.format||"rgba8unorm",this.type=t.type||"2d"}get glFormat(){return b[this.format].gl.format||null}get glSizedFormat(){return b[this.format].gl.sizedFormat}get glTarget(){switch(this.type){case"cube":return GL.TEXTURE_CUBE_MAP;case"2d":default:return GL.TEXTURE_2D}}},_=class{constructor(e,t,r,o=null,s={}){this.format=e,this.width=Math.max(1,t),this.height=Math.max(1,r),this.levels=[],o&&this.getLevel(0).setSlice(0,o,s)}getLevel(e,t={}){let r=this.levels[e];return r||(r=new P(this,e,t),this.levels[e]=r),r}},P=class{constructor(e,t,r){this.textureData=e,this.levelIndex=t,this.width=Math.max(1,r.width||this.textureData.width>>t),this.height=Math.max(1,r.height||this.textureData.height>>t),this.slices=[]}setSlice(e,t,r={}){if(this.slices[e]!=null)throw new Error("Cannot define an image slice twice.");let o=r.byteOffset||0,s=r.byteLength||0,i;t instanceof ArrayBuffer?(i=t,s||(s=i.byteLength-o)):(i=t.buffer,s||(s=t.byteLength-o),o+=t.byteOffset),this.slices[e]={buffer:i,byteOffset:o,byteLength:s}}},f=class{constructor(e,t){this.mimeTypes=e,this.callback=t,this.loader=null}getLoader(){return this.loader||(this.loader=this.callback()),this.loader}},R={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",apng:"image/apng",gif:"image/gif",bmp:"image/bmp",webp:"image/webp",ico:"image/x-icon",cur:"image/x-icon",svg:"image/svg+xml",basis:"image/basis",ktx:"image/ktx",ktx2:"image/ktx2",dds:"image/vnd.ms-dds"},U=[new f(v.supportedMIMETypes(),()=>new v),new f(["image/basis"],()=>new p("workers/basis/basis-worker.js")),new f(["image/ktx","image/ktx2"],()=>new p("workers/ktx/ktx-worker.js")),new f(["image/vnd.ms-dds"],()=>new p("workers/dds-worker.js"))],m=Symbol("wtt/WebTextureClient"),w=Symbol("wtt/WebTextureLoaders"),E=document.createElement("a"),Y=typeof createImageBitmap!="undefined",x={mimeType:null,mipmaps:!0,colorSpace:"default"};function I(a,e){if(!e)throw new Error("A valid MIME type must be specified.");let t=a[w][e];t||(t=a[w]["*"]);let r=t.getLoader();if(!r)throw new Error(`Failed to get loader for MIME type "${e}"`);return r}var B=class{constructor(e){this[m]=e,this[w]={};for(let t of U)for(let r of t.mimeTypes)this[w][r]=t;this[w]["*"]=U[0]}async fromUrl(e,t){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");let r=Object.assign({},x,t);if(E.href=e,!r.mimeType){let s=E.pathname.lastIndexOf("."),i=s>-1?E.pathname.substring(s+1).toLowerCase():"*";r.mimeType=R[i]}return I(this,r.mimeType).fromUrl(this[m],E.href,r)}async fromBlob(e,t){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");let r=Object.assign({},x,t);return I(this,e.type).fromBlob(this[m],e,r)}async fromBuffer(e,t){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");let r=Object.assign({},x,t);if(!r.mimeType&&r.filename){let s=r.filename.lastIndexOf("."),i=s>-1?r.filename.substring(s+1).toLowerCase():null;r.mimeType=R[i]}return I(this,r.mimeType).fromBuffer(this[m],e,r)}async fromElement(e,t){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");let r=Object.assign({},x,t);if(!Y)return this[m].textureFromImageElement(e,"rgba8unorm",r);let o=await createImageBitmap(e);return this[m].fromImageBitmap(o,"rgba8unorm",r)}async fromImageBitmap(e,t){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");let r=Object.assign({},x,t);return this[m].fromImageBitmap(e,"rgba8unorm",r)}fromColor(e,t,r,o=1,s="rgba8unorm"){if(!this[m])throw new Error("Cannot create new textures after object has been destroyed.");if(s!="rgba8unorm"&&s!="rgba8unorm-srgb")throw new Error('createTextureFromColor only supports "rgba8unorm" and "rgba8unorm-srgb" formats');let i=new Uint8Array([e*255,t*255,r*255,o*255]);return this[m].fromTextureData(new _(s,1,1,i),!1)}set allowCompressedFormats(e){this[m].allowCompressedFormats=!!e}get allowCompressedFormats(){return this[m].allowCompressedFormats}destroy(){this[m]&&(this[m].destroy(),this[m]=null)}};var S=class{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}getMipmapPipeline(e){let t=this.pipelines[e];return t||((!this.mipmapVertexShaderModule||!this.mipmapFragmentShaderModule)&&(this.mipmapVertexShaderModule=this.device.createShaderModule({code:`
            var<private> pos : array<vec2<f32>, 4> = array<vec2<f32>, 4>(
              vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, 1.0),
              vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0));
            var<private> tex : array<vec2<f32>, 4> = array<vec2<f32>, 4>(
              vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0),
              vec2<f32>(0.0, 1.0), vec2<f32>(1.0, 1.0));
            
            struct VertexOutput {
              [[builtin(position)]] position : vec4<f32>;
              [[location(0)]] texCoord : vec2<f32>;
            };

            [[stage(vertex)]]
            fn main([[builtin(vertex_index)]] vertexIndex : i32) -> VertexOutput {
              var output : VertexOutput;
              output.texCoord = tex[vertexIndex];
              output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
              return output;
            }
          `}),this.mipmapFragmentShaderModule=this.device.createShaderModule({code:`
            [[binding(0), group(0)]] var imgSampler : sampler;
            [[binding(1), group(0)]] var img : texture_2d<f32>;

            [[stage(fragment)]]
            fn main([[location(0)]] texCoord : vec2<f32>) -> [[location(0)]] vec4<f32> {
              return textureSample(img, imgSampler, texCoord);
            }
          `})),t=this.device.createRenderPipeline({vertex:{module:this.mipmapVertexShaderModule,entryPoint:"main"},fragment:{module:this.mipmapFragmentShaderModule,entryPoint:"main",targets:[{format:e}]},primitive:{topology:"triangle-strip",stripIndexFormat:"uint32"}}),this.pipelines[e]=t),t}generateMipmap(e,t){let r=this.getMipmapPipeline(t.format);if(t.dimension=="3d"||t.dimension=="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let o=e,s=t.size.depth||1,i=t.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!i){let c={size:{width:Math.ceil(t.size.width/2),height:Math.ceil(t.size.height/2),depthOrArrayLayers:s},format:t.format,usage:GPUTextureUsage.COPY_SRC|GPUTextureUsage.SAMPLED|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:t.mipLevelCount-1};o=this.device.createTexture(c)}let n=this.device.createCommandEncoder({}),l=r.getBindGroupLayout(0);for(let c=0;c<s;++c){let u=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:c,arrayLayerCount:1}),M=i?1:0;for(let d=1;d<t.mipLevelCount;++d){let F=o.createView({baseMipLevel:M++,mipLevelCount:1,dimension:"2d",baseArrayLayer:c,arrayLayerCount:1}),y=n.beginRenderPass({colorAttachments:[{view:F,loadValue:[0,0,0,0]}]}),W=this.device.createBindGroup({layout:l,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u}]});y.setPipeline(r),y.setBindGroup(0,W),y.draw(4,1,0,0),y.endPass(),u=F}}if(!i){let c={width:Math.ceil(t.size.width/2),height:Math.ceil(t.size.height/2),depthOrArrayLayers:s};for(let u=1;u<t.mipLevelCount-1;++u)n.copyTextureToTexture({texture:o,mipLevel:u-1},{texture:e,mipLevel:u},c),c.width=Math.ceil(c.width/2),c.height=Math.ceil(c.height/2)}return this.device.queue.submit([n.finish()]),i||o.destroy(),e}};var $=typeof createImageBitmap!="undefined",O={"texture-compression-bc":["bc1-rgba-unorm","bc1-rgba-unorm-srgb","bc2-rgba-unorm","bc2-rgba-unorm-srgb","bc3-rgba-unorm","bc3-rgba-unorm-srgb","bc7-rgba-unorm","bc7-rgba-unorm-srgb"]},D={rgb8unorm:"rgb8unorm-srgb",rgba8unorm:"rgba8unorm-srgb",bgra8unorm:"bgra8unorm-srgb","bc1-rgba-unorm":"bc1-rgba-unorm-srgb","bc2-rgba-unorm":"bc2-rgba-unorm-srgb","bc3-rgba-unorm":"bc3-rgba-unorm-srgb","bc7-rgba-unorm":"bc7-rgba-unorm-srgb"},X={"rgb8unorm-srgb":"rgb8unorm","rgba8unorm-srgb":"rgba8unorm","bgra8unorm-srgb":"bgra8unorm","bc1-rgba-unorm-srgb":"bc1-rgba-unorm","bc2-rgba-unorm-srgb":"bc2-rgba-unorm","bc3-rgba-unorm-srgb":"bc3-rgba-unorm","bc7-rgba-unorm-srgb":"bc7-rgba-unorm"};function A(a,e){switch(e){case"sRGB":return D[a]||a;case"linear":return X[a]||a;default:return a}}function j(a,e){return Math.floor(Math.log2(Math.max(a,e)))+1}var N=class extends B{constructor(e,t){super(new z(e),t)}},z=class{constructor(e){this.device=e,this.allowCompressedFormats=!0,this.uncompressedFormatList=["rgba8unorm","rgba8unorm-srgb","bgra8unorm","bgra8unorm-srgb"],this.supportedFormatList=["rgba8unorm","rgba8unorm-srgb","bgra8unorm","bgra8unorm-srgb"];let t=e.features;if(t){for(let r in O)if(t.has(r)){let o=O[r];this.supportedFormatList.push(...o)}}this.mipmapGenerator=new S(e)}supportedFormats(){return this.allowCompressedFormats?this.supportedFormatList:this.uncompressedFormatList}async fromImageBitmap(e,t,r){if(!this.device)throw new Error("Cannot create new textures after object has been destroyed.");let o=r.mipmaps,s=o?j(e.width,e.height):1,i=GPUTextureUsage.COPY_DST|GPUTextureUsage.SAMPLED,n={size:{width:e.width,height:e.height},format:A(t,r.colorSpace),usage:i,mipLevelCount:s},l=this.device.createTexture(n);return this.device.queue.copyImageBitmapToTexture({imageBitmap:e},{texture:l},n.size),o&&this.mipmapGenerator.generateMipmap(l,n),new T(l,{width:e.width,height:e.height,mipLevels:s,format:t})}async fromImageElement(e,t,r){if(!this.device)throw new Error("Cannot create new textures after object has been destroyed.");if(!$)throw new Error("Must support ImageBitmap to use WebGPU. (How did you even get to this error?)");let o=await createImageBitmap(e);return this.textureFromImageBitmap(o,t,r)}fromTextureData(e,t){if(!this.device)throw new Error("Cannot create new textures after object has been destroyed.");let r=b[e.format];if(!r)throw new Error(`Unknown format "${e.format}"`);let o=r.compressed||{blockBytes:4,blockWidth:1,blockHeight:1},s=t.mipmaps&&r.canGenerateMipmaps,i=e.levels.length>1?e.levels.length:s?j(e.width,e.height):1,n=GPUTextureUsage.COPY_DST|GPUTextureUsage.SAMPLED,l={size:{width:Math.ceil(e.width/o.blockWidth)*o.blockWidth,height:Math.ceil(e.height/o.blockHeight)*o.blockHeight,depthOrArrayLayers:e.depth},format:A(e.format,t.colorSpace),usage:n,mipLevelCount:i},c=this.device.createTexture(l);for(let u of e.levels){let M=Math.ceil(u.width/o.blockWidth)*o.blockBytes;for(let d of u.slices)this.device.queue.writeTexture({texture:c,mipLevel:u.levelIndex,origin:{z:d.sliceIndex}},d.buffer,{offset:d.byteOffset,bytesPerRow:M},{width:Math.ceil(u.width/o.blockWidth)*o.blockWidth,height:Math.ceil(u.height/o.blockHeight)*o.blockHeight})}return s&&this.mipmapGenerator.generateMipmap(c,l),new T(c,{width:e.width,height:e.height,depth:e.depth,mipLevels:i,format:e.format,type:e.type})}destroy(){this.device=null}};export{N as WebGPUTextureLoader};
//# sourceMappingURL=webgpu-texture-loader.js.map