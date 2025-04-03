class DoubanCard {
    private ele: HTMLElement;
    private subjectId: string;
    private requestUrl: string;
    private requestType: string;
    private localData: object;

    constructor(ele: HTMLElement, subjectId: string, requestUrl: string, requestType: string, data: string) {
        this.ele = ele;
        this.subjectId = subjectId;
        this.requestUrl = requestUrl;
        this.requestType = requestType;
        this.localData = data ? JSON.parse(data): null
        if (!this.localData) {
            const model = this.fetchData();
            if (this.requestType == 'movie') {
                this.renderMovie(model);
            } else {
                this.renderBook(model);
            }
        } else {
            const localModel = this.convert(this.localData, this.requestType);
            if (this.requestType == 'movie') {
                this.renderMovie(localModel);
            } else {
                this.renderBook(localModel);
            }
        }
    }

    private fetchData() {
        var cacheItem = localStorage.getItem(this.subjectId);
        if (cacheItem == null || typeof (cacheItem) == 'undefined') {
            fetch(this.requestUrl)
                .then(response => response.json())
                .then(data => {
                    let model = {}
                    if (this.requestType == "movie") {
                        model = {
                            title: data.data[0].name,
                            link: 'https://movie.douban.com/subject/' + data.doubanId,
                            cover: data.data[0].poster,
                            desc: data.data[0].description,
                            star: Math.floor(parseFloat(data.doubanRating || 0)),
                            vote: data.doubanRating || 0,
                            genre: data.data[0].genre,
                            date: data.dateReleased,
                            director: data.director[0].data[0].name
                        };
                    } else {
                        let desc = data.summary
                        desc = desc.replaceAll('<p>', '')
                        desc = desc.replaceAll('</p>', '')
                        model = {
                            title: data.title,
                            link: 'https://book.douban.com/subject/' + this.subjectId,
                            cover: data.images.medium,
                            desc: desc,
                            star: Math.floor(parseFloat(data.rating.average || 0)),
                            vote: data.rating.average || 0,
                            date: data.pubdate,
                            author: data.author.join(',')
                        }
                    }

                    localStorage.setItem(this.subjectId, JSON.stringify(model));
                    return model;
                });
        } else {
            return JSON.parse(cacheItem);
        }
    }

    private renderMovie(model: any) {
        const htmlTags = model.genres.map(item =>`<span class="card-tag">${item}</span>`).join('')
        const html = `
        <div class="douban-card" id="douban-card">
            <div class="card-content">
                <h2 class="card-title">${model.title}</h2>
                <div class="card-meta">
                    <span class="card-rating">${model.vote}</span>
                    <div class="card-stars">
                        <span class="card-stars-dark">
                            <span class="card-stars-light" style="width: ${model.vote * 10}%;"></span>
                        </span>
                    </div>
                    <span>${model.date}</span>
                </div>
                <div class="card-description">${model.comment}</div>
                <div class="card-info">${model.desc}</div>
                <div class="card-tags">${htmlTags}</div>
                
            </div>
            <div class="card-cover">
                <img src="${model.cover}" alt="${model.title}">
            </div>
            <a href="${model.link}" class="link-overlay" id="douban-link" target="_blank"></a>
        </div>`
        this.ele.insertAdjacentHTML('afterend', html)
    }

    private renderBook(model: any) {
        const htmlTags = model.tags.map(item =>`<span class="card-tag">${item}</span>`).join('')
        const html = `
        <div class="douban-card" id="douban-card">
            <div class="card-content">
                <h2 class="card-title">${model.title}</h2>
                <div class="card-meta">
                    <span class="card-rating">${model.vote}</span>
                    <div class="card-stars">
                        <span class="card-stars-dark">
                            <span class="card-stars-light" style="width: ${model.vote * 10}%;"></span>
                        </span>
                    </div>
                    <span>${model.date}</span>
                </div>
                <div class="card-description">${model.comment}</div>
                <div class="card-info">${model.desc}</div>
                <div class="card-tags">${htmlTags}</div>
            </div>
            <div class="card-cover">
                <img src="${model.cover}" alt="${model.title}">
            </div>
            <a href="${model.link}" class="link-overlay" id="douban-link" target="_blank"></a>
        </div>
        `
        this.ele.insertAdjacentHTML('afterend', html)
    }

    private convert(data: any, type) {
        if (type == 'movie')  {
            return {
                title: data.subject.title,
                link: data.subject.url,
                cover: data.subject.pic.normal,
                desc: data.subject.card_subtitle.split('/').map(x => x.trim()).join('/'),
                star: data.subject.rating.star_count,
                vote: data.subject.rating.value,
                genres: data.subject.genres,
                date: data.subject.pubdate[0],
                director: data.subject.directors[0].name,
                comment: data.comment ?? ''
            };
        } else {
            return  {
                title: data.subject.title,
                link: data.subject.url,
                cover: data.subject.pic.normal,
                desc: data.subject.card_subtitle.split('/').map(x => x.trim()).join('/'),
                intro: data.subject.intro,
                star: data.subject.rating.star_count,
                vote: data.subject.rating.value,
                date: data.subject.pubdate[0],
                author: data.subject.author[0],
                comment: data.comment ?? '',
                tags: data.tags
            };
        }
    }
}

window.$DoubanCard = function (ele, subjectId, requestUrl, requestType, localData) {
    return new DoubanCard(ele, subjectId, requestUrl, requestType, localData);
}