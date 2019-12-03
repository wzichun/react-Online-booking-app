import React from "react"
import defaultStyle from "../../assets/styles/RecentBanner.module.css"
import Slider from "react-slick";

let timer = ""

class Swiper extends React.Component {
    state = {
        data: [],
        length:"",
        imgHeight: 176,
        selectedIndex: 0,
        aixinimg:require('../../assets/imgs/heart1.png')
    }

    componentDidMount() {
        timer = setTimeout(() => {
            this.setState({
                data: this.props.imglists,
                length:this.props.imglists.length
            });

        }, 700);
    }

    componentWillUnmount() {
        clearTimeout(timer)
    }   
    //实现跳转
    jump(_id) {   // 调转路由
        // console.log(this.props,"1234567");
        
        this.props.history.push(`/comment/${_id}`)
    }
    add(index ){
    this.setState(function(){
        return this.state.data.push(this.state.data[index])
    })
}
    render() {
        //为Slider设置属性
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:1000,
            touchMove:true
        };
        if (this.state.data.length) {
            return (
                <div className={defaultStyle.mostExpected}>
                    <p className={defaultStyle.ptitle}>近期最受欢迎</p>
                    <div className={defaultStyle.container}>
                        {/* 与上面的对应 */}
                        <Slider {...settings}>
                            {this.state.data.map((val,index) => (
                                <div className={defaultStyle.expectedItem} key={val.id} onClick={this.jump.bind(this,val.id)}>
                                <div
                                    className={defaultStyle.aimg}
                                >
                                    <img
                                        src={val.img}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                    {/* 多少人想看 */}
                                    <span className={defaultStyle.wish}>{val.wish}想看</span>
                                </div>
                                {/* 爱心图片 */}
                                <div className={defaultStyle.aixin} >
                                    <img src={ this.state.aixinimg } style={{width:"100%"}}>
                                    </img>
                                </div>
                                {/* 电影信息 */}
                                <h5 className={defaultStyle.mvname}>{val.nm}</h5>
                                <p className={defaultStyle.mvdata}>{val.comingTitle}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            );
        } else {
            return (
                <h1></h1>
            )
        }

    }
}

export default Swiper
