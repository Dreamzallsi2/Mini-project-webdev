namespace miniprojectweb.Models
{

    public class OrderData
    {
        public int Id { get; set; }
        public User User { get; set; }
        public List<Ordered> list_ordered { get; set; }
        public decimal Total { get; set; }
        public bool State { get; set; }
    }

    public class User
    {
        public string Name { get; set; }
        public string Tel { get; set; }
        public string Address { get; set; }
    }

    public class Ordered
    {
        public string Name { get; set; }
        public string Food { get; set; }
        public int Price { get; set; }
        public int Amount { get; set; }
        public string Textarea { get; set; }
    }


    /*
    public class APIPassing
    {
        public string Rname { get; set; }
        public string Rfood { get; set; }
        public int Rprice { get; set;}
        public int Ramount { get; set; }
        public string RDescription { get; set; }
        public string Ccontact { get; set; }
        public string Cname { get; set; }
        public string Cddress { get; set; }

    }*/
}
