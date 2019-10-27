using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreMvcEds.Models
{
    public class UserViewModel
    {
        [DisplayName("标题")]
        public string Name { get; set; }
        [DisplayName("年纪")]
        public int Age { get; set; }
        //[DisplayName("Email")]
        //[UIHint("MultilineText")]
        //public string Email { get; set; }
        //[DisplayName("类型_EnumRadio"), EnumDataType(typeof(Type))]
        //[UIHint("_EnumRadio")]
        //public Type Type { get; set; }
        //[DisplayName("类型_EnumCheckbox"), EnumDataType(typeof(Type))]
        //[UIHint("_EnumCheckbox")]
        //public Type Type2 { get; set; }
        //[DisplayName("类型_EnumDropdownList"), EnumDataType(typeof(Type))]
        //[UIHint("_EnumDropdownList")]
        //public Type Type3 { get; set; }
        [DisplayName("出生日期")]
        [UIHint("Date")]
        public DateTime Birthday { get; set; }
        [DisplayName("性别")]
        [UIHint("Bool")]
        public bool Sex { get; set; }

        [UIHint("YseOrNo")]
        public bool YesOrNo { get; set; }

        [UIHint("MyFriend")]
        public List<Friend> list { get; set; }
        [UIHint("MyRole")]
        public Role role { get; set; }

    }

    public enum Role
    {
        admin,
        pm,
        one,
    }
    public class Friend
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
